import { Howl } from "howler";
import loadSound from "../loadSound";
import { vi, describe, it, expect } from "vitest";

function MockHowl({ src, onload, onloaderror }) {
  if (src === "valid-source.mp3") {
    setTimeout(() => {
      onload();
    }, 500);
  }

  if (src === "fail-source.mp3") {
    setTimeout(() => {
      onloaderror("123", "There was an error while loading the sound.");
    }, 500);
  }
}

vi.mock("howler", () => {
  return {
    Howl: MockHowl,
  };
});

describe("loadSound", () => {
  it("returns the promise of a loaded sound", () => {
    const promise = loadSound({
      src: "valid-source.mp3",
    });

    expect(promise).toBeInstanceOf(Promise);
  });

  it("returnes the resolved sound", async () => {
    const howl = await loadSound({
      src: "valid-source.mp3",
    });

    expect(howl).toBeInstanceOf(Howl);
  });

  it("rejects when failing to load the sound", async () => {
    expect.assertions(1);

    await expect(
      loadSound({
        src: "fail-source.mp3",
      })
    ).rejects.toEqual("There was an error while loading the sound.");
  });

  it('should call "onload" handler if provided', async () => {
    const mockOnload = vi.fn();

    await loadSound({
      onload: mockOnload,
      src: "valid-source.mp3",
    });

    expect(mockOnload).toHaveBeenCalled();
  });

  it('should call "onloaderror" handler if provided', async () => {
    const mockOnLoadError = vi.fn();

    try {
      await loadSound({
        onloaderror: mockOnLoadError,
        src: "fail-source.mp3",
      });
    } catch (error) {
      expect(mockOnLoadError).toHaveBeenCalled();
    }
  });
});
