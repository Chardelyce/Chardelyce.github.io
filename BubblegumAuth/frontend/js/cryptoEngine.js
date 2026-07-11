/*
==========================================
BubblegumAuth Crypto Engine
Proof-of-Concept Version

Uses the browser Web Crypto API to
generate deterministic seeds.

Later:
FastAPI will generate the seed and
the frontend will only receive it.
==========================================
*/

export default class CryptoEngine {

    constructor(){

        this.seed = "";

    }

    //----------------------------------
    // SHA-256
    //----------------------------------

    async sha256(text){

        const encoder = new TextEncoder();

        const data = encoder.encode(text);

        const hashBuffer =
            await crypto.subtle.digest(
                "SHA-256",
                data
            );

        const bytes =
            Array.from(
                new Uint8Array(hashBuffer)
            );

        return bytes
            .map(b=>b.toString(16).padStart(2,"0"))
            .join("");

    }

    //----------------------------------
    // Demo Seed
    //----------------------------------

    async generateSeed(username,password){

        const combined =
            username +
            ":" +
            password +
            ":BubblegumAuth";

        this.seed =
            await this.sha256(combined);

        return this.seed;

    }

    //----------------------------------
    // Integer Seed
    //----------------------------------

    getIntegerSeed(){

        let value = 0;

        for(let i=0;i<this.seed.length;i++){

            value +=
                this.seed.charCodeAt(i) *
                (i+1);

        }

        return value >>> 0;

    }

    //----------------------------------
    // Seeded Random
    //----------------------------------

    random(){

        let x = this.getIntegerSeed();

        x ^= x << 13;

        x ^= x >> 17;

        x ^= x << 5;

        return Math.abs(x) / 4294967295;

    }

    //----------------------------------
    // Deterministic Character
    //----------------------------------

    nextCharacter(charset){

        const index =
            Math.floor(
                this.random() *
                charset.length
            );

        return charset[index];

    }

}