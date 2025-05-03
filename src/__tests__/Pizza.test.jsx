import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import Pizza from "../Pizza";

test("alt text renders on Piza image", async () => { // make sure this string is descriptive; what test failed?
    const name = "My Favorite Pizza";
    const src = "https://picsum.photos/200";

    const screen = render(
        <Pizza name={name} description="super cool ice cream" image={src} />
    );

    const img = screen.getByRole("img");
    expect(img.src).toBe(src);
    expect(img.alt).toBe(name);
});
