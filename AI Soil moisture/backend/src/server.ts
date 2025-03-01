import { config } from "./config/config";
import app from "./app";
import connectDB from "./config/db";

const main = async () => {
  const PORT = config.port || 3300;

  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main();
