// https://stackoverflow.com/questions/51194226/supertest-e2e-with-nestjs-request-is-not-a-function
// https://stackoverflow.com/questions/13754105/reuse-supertest-tests-on-a-remote-url
// https://github.com/ladjs/supertest#example
var request = require('supertest')
const express = require("express");
const { JsonableValue } = require('ts-jest');
// const request = require('superagent')
// const server = require('../server');
// var should = require('should');
// var agent = request.agent();

const app = express();

// const host = `http://[2605:fd00:4:1001:f816:3eff:fec4:a25b]`
var request = request.bind(request, 'http://[2605:fd00:4:1001:f816:3eff:fec4:a25b]'); 


describe(`Creates an org, adds member to the org, takes a survey, generates reports, 
        deletes the member and the org`, function() {
    let org_id; 
    let member_id;
    let first_name = "Jaskirat";
    let last_name = "Singh";
    let email_ = "jsingh@ooga.ca";
    let orgname_ = "ooga booga";
    let position_ = "cool guy";
    let survey_id = 1;

    it(`Creates an org`, function(done) {
        request(app)
            .post('/organization/create_organization')
            .send({
                orgname: orgname_
            })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(201)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                } else {
                    org_id = JSON.parse(res.text)["id"]
                    console.log(org_id)
                    return done();
                }
            });
    });

    it(`Gets the org we just made`, function(done) {
        request(app)
            .get(`/organization/${org_id}`)
            .expect(200, 
                [{
                oid: org_id, 
                mid: null,
                orgname: orgname_
            }], 
            done);
    });

    it(`Creates a member and adds it to our org`, function(done) {
        request(app)
            .post('/members/')
            .send({
                firstname : first_name,
                lastname : last_name,
                email : email_,
                position : position_,
                oid : org_id,
                criticalPositions: [1, 2, 3]
            })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                } else {
                    // console.log(res.text)
                    member_id = JSON.parse(res.text)["id"]
                    console.log(member_id)
                    return done();
                }
            });
    });

    
    it('Gets all the members from the org', function(done) {
        request(app)
            .get(`/organization/members/${org_id}`)
            .expect(200, 
                [{
                firstname : first_name,
                lastname : last_name,
                uid : member_id,
                role : position_,
                oid : org_id,
                membership: "Member"
            }])
            .end(function(err, res) {
                if (err) {
                    return done(err);
                } else {
                    return done();
                }
            });
    });

    it('Gets all the members` email from the org', function(done) {
        request(app)
        .get(`/organization/members/emails/${org_id}`)
        .expect(200, 
            [{
                uid: member_id,
                email: email_
            }])
            .end(function(err, res) {
                if (err) {
                    return done(err);
                } else {
                    return done();
                }
            });
        });
        
        it(`Edits our member's info`, function(done) {
            request(app)
                .patch('/members/')
                .send({
                    email : "jazzy@1234.com",
                    oid : org_id
                })
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    } else {
                        return done();
                    }
                });
        });

        it('Gets the survey', function(done) {
            request(app)
            .get(`/surveys/${survey_id}`)
            .expect(200)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    } else {
                        return done();
                    }
                });
        });
        
        
        it(`Takes a survey`, function(done) {
            request(app)
                .post('/surveys/take_survey')
                .send({
                    oid : org_id,
                    Employee_id : member_id,
                    Answers : [-1,2,2,5,4,3,4,-1,-1,2,2,3,2,2,2,4,5,3],
                    Survey_id : survey_id,
                    oid : org_id
                })
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    } else {
                        return done();
                    }
                });
        });

        it(`Takes an organization survey`, function(done) {
            request(app)
                .post('/surveys/take_survey')
                .send({
                    oid : org_id,
                    Employee_id : member_id,
                    Answers :  [1,1,2,1,1],
                    Survey_id : 2,
                    oid : org_id
                })
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    } else {
                        return done();
                    }
                });
        });

        it('Gets the individual report', function(done) {
            request(app)
            .get(`/reports/individualReport?uid=${member_id}`)
            .expect(200)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    } else {
                        return done();
                    }
                });
        });

        it('Gets the manager report', function(done) {
            request(app)
            .get(`/reports/managerReport?uid=${member_id}`)
            .expect(200)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    } else {
                        return done();
                    }
                });
        });

        it('Gets the organization report', function(done) {
            request(app)
            .get(`/reports/organizationReport?oid=${org_id}`)
            .expect(200)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    } else {
                        return done();
                    }
                });
        });

        it('Gets the critical positions', function(done) {
            request(app)
            .get(`/reports/criticalPositions?oid=${org_id}`)
            .expect(200)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    } else {
                        return done();
                    }
                });
        });

        it('Gets the expectations', function(done) {
            request(app)
            .get(`/reports/expectations?oid=${org_id}`)
            .expect(200)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    } else {
                        return done();
                    }
                });
        });

        it(`Deletes our member`, function(done) {
            request(app)
                .delete(`/members/${member_id}`)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    } else {
                        return done();
                    }
                });
        });

        it('Deletes the org we just made', function(done) {
            request(app)
            .delete(`/organization/${org_id}`)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                } else {
                    return done();
                }
            });
    });
});

describe(`Signs up, change our name and email, toggle our notifications`, function() {
    let org_id; 
    let user_id;
    let first_name = "Jaskirat";
    let last_name = "Singh";
    let email_ = "jsingh@ooga.ca";
    let new_email_ = "jsingh@booga.ca";
    let orgname_ = "ooga booga";
    let position_ = "cool guy";
    let survey_id = 1;
    let password_ = "1234"
    let new_password_ = "12345"

    it(`Signs us up`, function(done) {
        request(app)
            .post('/signUp/')
            .send({
                email: email_,
                password: password_,
            })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                } else {
                    console.log(res.text)
                    user = JSON.parse(res.text)["user"]
                    console.log(user)
                    user_id = user["uid"]
                    console.log(user_id)
                    return done();
                }
            });
    });

    
    it(`Signs us in`, function(done) {
        request(app)
            .get(`/signIn?email=${email_}&password=${password_}`)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                } else {
                    return done();
                }
            });
    });

    it(`Gets our email`, function(done) {
        request(app)
            .get(`/profile/email/${user_id}`)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                } else {
                    email = JSON.parse(res.text)["email"]
                    console.log(email)
                    if (email === email_)
                        return done();
                    else{
                        return done(err)
                    }
                }
            });
    });

    it(`Inputs our name`, function(done) {
        request(app)
            .patch(`/profile/name/${user_id}`)
            .send({
                uid: user_id,
                firstname: first_name,
                lastname: last_name,
            })
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                } else {
                    return done();
                }
            });
    });

    it(`Gets our name`, function(done) {
        request(app)
            .get(`/profile/name/${user_id}`)
            .expect(200)
            .end(function(err, res) {
                _name = JSON.parse(res.text)["name"]
                console.log(_name)
                if (_name === `${first_name} ${last_name}`)
                    return done();
                else{
                    return done(err)
                }
            });
    });

    it(`Changes our email`, function(done) {
        request(app)
            .patch(`/profile/email/${user_id}`)
            .send({
                uid: user_id,
                email: new_email_,
            })
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                } else {
                    return done();
                }
            });
    });

    it(`Gets our new email`, function(done) {
        request(app)
            .get(`/profile/email/${user_id}`)
            .expect(200)
            .end(function(err, res) {
                    email = JSON.parse(res.text)["email"]
                    console.log(email)
                    if (email === new_email_)
                        return done();
                    else{
                        return done(err)
                    }
            });
    });



    it(`Toggles our notification settings`, function(done) {
        request(app)
            .patch(`/profile/name/${user_id}`)
            .send({
                uid: user_id,
            })
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                } else {
                    return done();
                }
            });
    });

    // it(`Change password`, function(done) {
    //     request(app)
    //         .get(`/reset-password/?uid=${user_id}&password=${password_}&new_password=${new_password_}`)
    //         .expect(200)
    //         .end(function(err, res) {
    //             if (err) {
    //                 return done(err);
    //             } else {
    //                 return done();
    //             }
    //         });
    // });

    it(`Reset password`, function(done) {
        request(app)
            .get(`/reset-password/resetPass?uid=${user_id}&password=${password_}`)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                } else {
                    return done();
                }
            });
    });

})

