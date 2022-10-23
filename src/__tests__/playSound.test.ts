import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { Howl } from "howler";

import playSound from "../playSound";

function delay(fn: (args: unknown) => void, args?: unknown) {
  setTimeout(() => {
    fn(args);
  }, 100);
}

const mockPlay = vi.fn();
const mockOn = vi.fn();

const sound = {
  play: mockPlay,
  on: mockOn,
} as unknown as Howl;

describe("playSound", () => {
  beforeEach(() => {
    mockOn.mockImplementation((eventName: string, handler: () => void) => {
      if (eventName === "end") {
        delay(handler);
      }
    });
  });

  afterEach(() => {
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

    expect(mockOn).toHaveBeenCalledWith("end", expect.anything());
    expect(resolvedSound).not.toBeInstanceOf(Promise);
    expect(resolvedSound).toEqual(sound);
  });

  it("rejects promise when there is an error", async () => {
    mockOn.mockImplementation((eventName: string, handler: () => void) => {
      if (eventName === "playerror") {
        delay(handler);
      }
    });

    try {
      await playSound(sound);
    } catch (error) {
      expect(mockOn).toHaveBeenCalledWith("playerror", expect.anything());
    }
  });

  it("should set listeners for promise success and error", () => {
    playSound(sound);

    expect(mockOn).toBeCalledTimes(2);
    expect(mockOn).toBeCalledWith("playerror", expect.anything());
    expect(mockOn).toBeCalledWith("end", expect.anything());
  });
});
