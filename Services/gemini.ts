import { GoogleGenAI } from "@google/genai";
import { Character } from "../constants";

/**
 * Converts a File object to a Base64 string suitable for Gemini API (no data URL prefix).
 */
async function fileToGenerativePart(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Generates a cosplay image using Gemini 2.5 Flash Image model.
 */
export async function generateCosplayImage(
  imageFile: File,
  character: Character,
  pose: string,
  bg: string,
  hairStyleMode: string
): Promise<string | null> {
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const imageBase64 = await fileToGenerativePart(imageFile);

    let hairInstruction = "";
    switch (hairStyleMode) {
      case 'user':
        hairInstruction = "HAIR STYLE: STRICTLY KEEP the user's original hairstyle, length, and color from the uploaded photo. Do NOT change their hair to match the character description. Ignore any hair color references in the Costume & Style section.";
        break;
      case 'character':
        hairInstruction = "HAIR STYLE: STRICTLY ENFORCE the character's canonical hair color and style (as described in Costume & Style). Use a wig or styling to match the character exactly, overriding the user's natural hair.";
        break;
      case 'blend':
      default:
        hairInstruction = "HAIR STYLE: Create a balanced blend. Combine the user's natural hair texture/length with the character's canonical color or signature accessories.";
        break;
    }

    // Handle background specific override for "Studio grey" to match reference photo
    let backgroundPrompt = bg;
    if (bg.toLowerCase().includes('studio grey')) {
      backgroundPrompt = "Dark grey textured professional photography backdrop with soft vignette, dramatic cinematic studio lighting. Minimalist and moody.";
    }

    const prompt = `
      Create a hyper-realistic, medium close-up cosplay photograph of the person in this image as the "${character.name}" (${character.archetype}) from the game TowerFall.

      VISUAL INSTRUCTIONS:
      1. COMPOSITION & FRAMING (CRITICAL): **Medium Close-Up / Headshot**. The face must take up the largest portion of the frame (approx 40-50%). Crop from the chest up. This image is for a character selection icon, so the face must be large, clear, and recognizable. Do NOT generate a full-body shot.
      2. FACE VISIBILITY (MANDATORY): The user's face MUST remain fully visible. **ABSOLUTELY NO SCARVES, MASKS, OR HIGH COLLARS COVERING THE MOUTH OR NOSE.** Do NOT cover the face with heavy shadows or helmets. If the character design normally includes a scarf, it MUST be lowered loosely around the neck. If they wear a mask, it MUST be removed or pushed up onto the forehead. The entire face from chin to forehead must be clearly seen.
      3. Identity: Strictly preserve the facial features, expression, skin tone, and facial hair of the source person.
      4. Costume & Style: ${character.promptDesc}. Focus on the headwear (hoods, helmets, hats) and shoulder/chest armor details. Ensure hoods are pushed back or loose enough to reveal the face.
      5. Hair: ${hairInstruction}
      6. Pose: ${pose} (Upper body view only). If a bow is visible, show it framing the face or held near the chest/shoulders.
      7. Setting: ${backgroundPrompt}.
      8. Style: **Photorealistic Cosplay Photography**. 8k resolution, incredibly detailed textures (leather, metal, fabric). Shot on 85mm lens. The image should look like a real high-end photograph of a person in a costume, NOT a 3D render, NOT a painting, and NOT an illustration. Use dramatic, cinematic lighting.
      
      The result should look like a high-resolution character portrait from a live-action movie adaptation.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: imageFile.type,
              data: imageBase64
            }
          },
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // Check for inline data (image) response
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const candidate = candidates[0];
      
      // Robust check for content availability (handles safety filter cases)
      if (!candidate.content || !candidate.content.parts) {
        throw new Error(`The AI was unable to generate an image. Reason: ${candidate.finishReason || 'Unknown'}. Please try a different photo or prompt.`);
      }

      const parts = candidate.content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
           return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    // Fallback if no image found in candidates
    throw new Error("No image data found in the response.");

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
}