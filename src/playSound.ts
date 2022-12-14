import { Howl } from "howler";

export default function playSound(sound: Howl): Promise<Howl> {
  return new Promise((resolve, reject) => {
    sound.on("end", () => {
      resolve(sound);
    });

    sound.on("playerror", (id, error) => {
      reject(error);
    });

    sound.play();
  });
}
