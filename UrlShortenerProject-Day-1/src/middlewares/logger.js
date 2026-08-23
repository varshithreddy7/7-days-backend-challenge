export const requestLogger = (req, res, next) => {
  // Record when the request arrived (in nanoseconds)
  const start = process.hrtime.bigint();

  // This fires automatically AFTER the response is fully sent
  res.on('finish', () => {
    const end = process.hrtime.bigint();

    // Convert nanoseconds to milliseconds
    const durationMs = Number(end - start) / 1e6;

    // Log: [timestamp] METHOD /path STATUS - Xms
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${durationMs.toFixed(2)}ms`);
  });

  // MUST call next() so the request continues to the route handler
  next();
};