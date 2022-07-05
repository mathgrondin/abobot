import { Exception } from "sass";
import { asyncSafetyWrap, safetyWrap } from "./safetyWrap";

describe("safetyWrap", () => {
    describe("asyncSafetyWrap", () => {
        test("valid callback", () => {
            const callback = () => true;
            var result = safetyWrap(callback);
            expect(result).toBe(true);
        })
        test("callback raising an exception", () => {
            const callback = () => {
                throw new Error("Error");
            };
            var result = safetyWrap(callback);
            expect(result).toBe(undefined);
        })
        test("callback raising an exception returns fallback value", () => {
            const callback = () => {
                throw new Error("Error");
            };
            const fallback = "I'm the backup"
            var result = safetyWrap(callback, fallback);
            expect(result).toEqual(fallback);
        })
    });
    describe("asyncSafetyWrap", () => {
        test("valid callback", async () => {
            const callback = async () => Promise.resolve().then(() => true);
            var result = await asyncSafetyWrap(callback);
            expect(result).toBe(true);
        })
        test("callback raising an exception", async () => {
            const callback = () => Promise.resolve().then(() => {
                throw new Error("Error");
            });
            var result = await asyncSafetyWrap(callback);
            expect(result).toBe(undefined);
        })
        test("callback raising an exception returns fallback value", async () => {
            const callback = () => Promise.resolve().then(() => {
                throw new Error("Error");
            });
            const fallback = "I'm the backup"
            var result = await asyncSafetyWrap(callback, fallback);
            expect(result).toEqual(fallback);
        })
    })
})