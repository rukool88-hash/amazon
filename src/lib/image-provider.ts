function cleanText(input: string) {
  return input.trim().replace(/\s+/g, " ");
}

export async function generateImageFromPrompt(prompt: string) {
  const cleanPrompt = cleanText(prompt || "E-commerce product creative image");

  // Pollinations 提供公开的文生图 URL，适合作为首版可运行的真实生成能力。
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}?width=1024&height=1024&nologo=true`;

  return {
    provider: "pollinations",
    imageUrl,
    previewUrl: imageUrl,
    metadata: {
      prompt: cleanPrompt,
      generatedAt: new Date().toISOString(),
    },
  };
}
