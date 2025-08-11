'use server';

import { detectDefects } from '@/ai/flows/detect-defects';
import type { DetectDefectsOutput } from '@/ai/flows/detect-defects';

interface ActionResult {
  defects?: string[];
  error?: string;
}

export async function runDetectDefects(
  jewelryImageDataUri: string
): Promise<ActionResult> {
  if (!jewelryImageDataUri || !jewelryImageDataUri.startsWith('data:image')) {
    return { error: 'Invalid image data provided.' };
  }

  try {
    const result: DetectDefectsOutput = await detectDefects({
      jewelryImageDataUri,
    });
    return { defects: result.defects };
  } catch (e: any) {
    console.error('Error in detectDefects flow:', e);
    return {
      error:
        'An unexpected error occurred during AI analysis. Please try again later.',
    };
  }
}
