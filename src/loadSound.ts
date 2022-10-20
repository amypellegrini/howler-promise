import { Howl, HowlOptions } from "howler";

export default function loadSound(options: HowlOptions) {
  const promise = new Promise<Howl>((resolve, reject) => {
    const sound = new Howl({
      ...options,
      onload: (soundId) => {
        options.onload && options.onload(soundId);
        resolve(sound);
      },
      onloaderror: (soundId, errorMessage) => {
        options.onloaderror && options.onloaderror(soundId, errorMessage);
        reject(errorMessage);
      },
    });
  });

  return promise;
}
