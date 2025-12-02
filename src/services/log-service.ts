const LOGFLARE_URL =
  "https://api.logflare.app/logs/json?api_key=5i4Oqb0QQHJ_&source=1107aca6-b22e-4b1b-8835-48fc3d192387";

interface LogEntry {
  message: string;
  metadata?: object;
}

export const log = async (entry: LogEntry) => {
  try {
    await fetch(LOGFLARE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...entry,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Error sending log to Logflare:", error);
  }
};
