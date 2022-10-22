import { vi, describe, it, expect, beforeEach } from "vitest";
import { Howl } from "howler";

import playSound from "../playSound";

const mockPlay = vi.fn();

describe("playSound", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a promise", () => {
    const sound = {
      play: mockPlay,
    } as unknown as Howl;

    const promise = playSound(sound);

    expect(promise).toBeInstanceOf(Promise);
  });

  it("plays a sound", () => {
    const sound = {
      play: mockPlay,
    } as unknown as Howl;

    playSound(sound);

    expect(mockPlay).toHaveBeenCalled();
  });
});
