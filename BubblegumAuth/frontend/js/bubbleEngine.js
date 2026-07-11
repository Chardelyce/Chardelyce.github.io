/*
=========================================
BubblegumAuth Bubble Engine
=========================================
*/

import Renderer from "./renderer.js";
import MutationEngine from "./mutationEngine.js";

export const STATES={

    IDLE:"IDLE",

    CLOUD:"CLOUD",

    COLLECT:"COLLECT",

    STICK:"STICK",

    STRETCH:"STRETCH",

    FOLD:"FOLD",

    MUTATE:"MUTATE",

    CREDENTIAL:"CREDENTIAL",

    CHALLENGE:"CHALLENGE",

    VERIFY:"VERIFY",

    POP:"POP",

    SUCCESS:"SUCCESS"

};

export default class BubbleEngine{

    constructor(){

        this.renderer=new Renderer();

        this.mutation=new MutationEngine();

        this.state=STATES.IDLE;

        this.stateStart=0;

        this.progress=0;

        this.cloud=[];

    }

    //--------------------------------

    start(){

        this.changeState(STATES.CLOUD);

    }

    //--------------------------------

    changeState(next){

        this.state=next;

        this.stateStart=performance.now();

        this.progress=0;

        console.log("State:",next);

    }

    //--------------------------------

    update(){

        this.renderer.clear();

        const elapsed=
            performance.now()-this.stateStart;

        switch(this.state){

            case STATES.CLOUD:

                this.progress=Math.min(elapsed/3000,1);

                this.renderer.drawCloud(this.cloud);

                if(elapsed>3000){

                    this.changeState(STATES.COLLECT);

                }

            break;

            case STATES.COLLECT:

                this.progress=Math.min(elapsed/1500,1);

                this.renderer.drawCloud(this.cloud);

                if(elapsed>1500){

                    this.changeState(STATES.STICK);

                }

            break;

            case STATES.STICK:

                this.renderer.drawStick(0);

                if(elapsed>1200){

                    this.changeState(STATES.STRETCH);

                }

            break;

            case STATES.STRETCH:

                this.progress=Math.min(elapsed/1000,1);

                this.mutation.stretch(this.progress);

                this.renderer.drawCredential(

                    this.mutation.getFrame()

                );

                if(elapsed>1000){

                    this.changeState(STATES.FOLD);

                }

            break;

            case STATES.FOLD:

                this.progress=Math.min(elapsed/1200,1);

                this.mutation.fold(this.progress);

                this.renderer.drawCredential(

                    this.mutation.getFrame()

                );

                if(elapsed>1200){

                    this.changeState(STATES.MUTATE);

                }

            break;

            case STATES.MUTATE:

                this.progress=Math.min(elapsed/3500,1);

                this.mutation.mutate(this.progress);

                this.renderer.drawCredential(

                    this.mutation.getFrame()

                );

                if(elapsed>3500){

                    this.mutation.finish();

                    this.changeState(STATES.CREDENTIAL);

                }

            break;

            case STATES.CREDENTIAL:

                this.renderer.drawCredential(

                    this.mutation.getFrame()

                );

            break;

        }

    }

}