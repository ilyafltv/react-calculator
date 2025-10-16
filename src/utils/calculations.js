export const executeExp = (exp) => {
  let normalizedExpression = exp.replace(/×/g, "*").replace(/÷/g, "/");
  try {
    const result = new Function(`return ${normalizedExpression}`)();
    return Math.round(result * 100) / 100;
  } catch (error) {
    console.error("Calculation error:", error);
    return null;
  }
};