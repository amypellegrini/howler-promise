import { vi, describe, it, expect, beforeEach } from "vitest";
import { Howl } from "howler";

import playSound from "../playSound";

function delay(fn: (args: unknown) => void, args?: unknown) {
  setTimeout(() => {
    fn(args);
  }, 100);
}

const mockPlay = vi.fn();

const sound = {
  play: mockPlay,
  on: (event: string, handler) => {
    delay(handler);
  },
} as unknown as Howl;

describe("playSound", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a promise", () => {
    const promise = playSound(sound);

    expect(promise).toBeInstanceOf(Promise);
  });

  it("plays a sound", () => {
    playSound(sound);

    expect(mockPlay).toHaveBeenCalled();
  });

  it("resolves promise with sound when playing ends", async () => {
    const resolvedSound = await playSound(sound);

    expect(resolvedSound).not.toBeInstanceOf(Promise);
    expect(resolvedSound).toEqual(sound);
  });
});
