let data = {
    traveller_type: {
        dual_citizen: "result-dual_citizen",
        canadian_citizen: "result-canadian_cit_pr",
        us_citizen: "question-purpose_of_travel",
        none: "question-uspr"
    },
    purpose_of_travel: {
        tourist: {
            canadian_citizen: "result-canadian_cit_pr",
            us_citizen: "result-GeneralUS",
            USA: "result-GeneralUS",
            uspr: "result-GeneralUSPR",
            visitor_visa: "result-visitor_visa"
        },
        transit: {
            us_citizen: "result-GeneralUS",
            uspr: "result-GeneralUSPR"
        },
        business: {
            us_citizen: "result-GeneralUS",
            uspr: "result-GeneralUSPR"
        },
        family: {
            us_citizen: {
                more: "result-supervisa-US",
                less: "result-GeneralUS"
            },
            uspr: {
                more: "result-supervisa-uspr",
                less: "result-GeneralUSPR"
            }
        },
        study: {
            us_citizen: {
                first_permit: "result-study-first_permit-US",
                have_permit: "result-study-have_permit-US",
                eligible_without: "result-study-eligible_without_permit-US",
                not_sure: "result-study-not_sure-US"
            },
            uspr: {
                first_permit: "result-study-first_permit-uspr",
                have_permit: "result-study-have_permit-uspr",
                extend_permit: "result-study-extend_permit-uspr",
                eligible_without: "result-study-eligible_without_permit-uspr",
                not_sure: "result-study-not_sure-uspr"
            }
        },
        work: {
            us_citizen: {
                first_permit: "result-work-first_permit-US",
                have_permit: "result-work-have_permit-US",
                eligible_without: "result-work-eligible_without_permit-US",
                not_sure: "result-work-not_sure-US"
            },
            uspr: {
                first_permit: "result-work-first_permit-uspr",
                have_permit: "result-work-have_permit-uspr",
                extend_permit: "result-work-extend_permit-uspr",
                eligible_without: "result-work-eligible_without_permit-uspr",
                not_sure: "result-work-not_sure-uspr"
            }
        }
    }
}
