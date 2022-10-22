import { Howl } from "howler";

export default function playSound(sound: Howl) {
  return new Promise(() => {
    sound.play();
  });
}
