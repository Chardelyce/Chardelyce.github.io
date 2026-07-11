/*
==========================================
BubblegumAuth Mutation Engine
Generates the credential transformation
==========================================
*/

const CHARSET =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default class MutationEngine {

    constructor(seed = "BubblegumAuth") {

        this.seed = seed;

        this.width = 32;
        this.height = 8;

        this.target = [];
        this.current = [];

        this.stage = "stick";

        this.generateTarget();
        this.reset();

    }

    //---------------------------------------
    // Build the final credential
    //---------------------------------------

    generateTarget() {

        this.target = [];

        let seedIndex = 0;

        for (let r = 0; r < this.height; r++) {

            let line = "";

            for (let c = 0; c < this.width; c++) {

                const ch =
                    this.seed.charCodeAt(seedIndex % this.seed.length);

                const index =
                    (ch + r * 17 + c * 31) % CHARSET.length;

                line += CHARSET[index];

                seedIndex++;

            }

            this.target.push(line);

        }

    }

    //---------------------------------------
    // Reset animation
    //---------------------------------------

    reset() {

        this.current = [];

        for (let i = 0; i < this.height; i++) {

            this.current.push("=".repeat(this.width));

        }

        this.stage = "stick";

    }

    //---------------------------------------
    // Return current frame
    //---------------------------------------

    getFrame() {

        return this.current;

    }

    //---------------------------------------
    // Stretch
    //---------------------------------------

    stretch(progress) {

        const amount =
            Math.floor(progress * 20);

        const width =
            this.width + amount;

        this.current = [];

        for (let i = 0; i < this.height; i++) {

            this.current.push(
                "=".repeat(width)
            );

        }

    }

    //---------------------------------------
    // Fold
    //---------------------------------------

    fold(progress) {

        this.current = [];

        for (let i = 0; i < this.height; i++) {

            const offset =
                Math.floor(
                    Math.sin(i + progress * 6) * 6
                );

            const spaces =
                " ".repeat(Math.max(0, offset));

            this.current.push(
                spaces +
                "=".repeat(this.width)
            );

        }

    }

    //---------------------------------------
    // Mutation
    //---------------------------------------

    mutate(progress) {

        this.current = [];

        for (let row = 0; row < this.height; row++) {

            let line = "";

            for (let col = 0; col < this.width; col++) {

                if (Math.random() < progress) {

                    line += this.target[row][col];

                } else {

                    line +=
                        CHARSET[
                            Math.floor(
                                Math.random() *
                                CHARSET.length
                            )
                        ];

                }

            }

            this.current.push(line);

        }

    }

    //---------------------------------------
    // Complete credential
    //---------------------------------------

    finish() {

        this.current = [...this.target];

        this.stage = "credential";

    }

}