function openResearch(type){

    let pdf;


    switch(type){


        case "math":

            pdf="https://journal.scsa.ge/wp-content/uploads/2024/07/0025_mathematical-modeling.pdf";

            break;



        case "dpet":

            pdf="https://ijres.org/papers/Volume-12/Issue-4/12045061.pdf";

            break;



        case "dimension":

            pdf="https://www.sciencepublishinggroup.com/article/10.11648/j.ajam.20251302.12";

            break;

    }


    window.open(
        pdf,
        "_blank",
        "toolbar=0,location=0,menubar=0"
    );

}