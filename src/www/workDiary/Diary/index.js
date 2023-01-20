import React, { Fragment } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";
import Sticky from "react-stickynode";
import FormInputGroupOverview from "../../../DemoPages/Forms/Elements/Controls/Examples/InputGroup/InputGroupOverview";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    CardFooter,
    CardTitle,
    Container,
    InputGroup,
    InputGroupText,
} from "reactstrap";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import api from "../api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let time = ["9:00-10:00", "10:00-11:00", "11:00-12:00",
            "12:00-1:00", "1:00-2:00", "2:00-3:00", 
            "3:00-4:00", "4:00-5:00"]

const WorkDiary = () => {
    const [diary, setDiary] = useState({
        title: "",
        time: "",
        activity: "",
        objective: "",
        result: "",
        note: ""
    });

    useEffect(() => {
        
        api.getTitle().then((response) => {
            setDiary((prev) => {
                return {...prev, title: response['data'][0][0]}
            });
        }).catch((err) => {
            console.log(err);
        })

        let params = {
            "range": "20.1.23",
            "time": "9:00-10:00"
        }
        loadData(params);

    }, []);

    const loadData = (params) => {
        api.getDetailsDiary(params).then((response) => {
            setDiary((prev) => {
                return {...prev, 
                    activity: response['data'][0] ? response['data'][0][0] : "",
                    objective: response['data'][0] ? response['data'][0][1] : "",
                    result: response['data'][0] ? response['data'][0][2] : "",
                    note: response['data'][0] ? response['data'][0][3] : ""}
            });
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleChange = (e) => {
        let name = e.target.name
        setDiary((prev) => {
            return {...prev, [name]: e.target.value}
        })

        let params = {
            "range": diary.title,
            "time": e.target.value
        }
        if(name==="time"){
            api.getDetailsDiary(params).then((response) => {
                if (response['data'][0]){
                    setDiary((prev) => {
                        return {...prev, 
                            activity: response['data'][0][0] !== undefined ? response['data'][0][0] : "",
                            objective: response['data'][0][1] !== undefined ? response['data'][0][1] : "",
                            result: response['data'][0][2] !== undefined ? response['data'][0][2] : "",
                            note: response['data'][0][3] !== undefined ? response['data'][0][3] : ""}
                    });
                }
                else{
                    setDiary((prev) => {
                        return {...prev, 
                            activity: "",
                            objective: "",
                            result: "",
                            note: ""}
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const createNewDiary = () => {
        api.createDiary().catch((err) => {
            console.log(err)
        })
    }
    
    const saveUpdateDiary = () => {

        let params = {
            'range': diary.title,
            'time': diary.time,
            "activity" : diary.activity ? diary.activity : "",
            "objective": diary.objective ? diary.objective : "",
            'result': diary.result ? diary.result : "",
            "note": diary.note ? diary.note : ""
        }
        api.updateDiary(params).catch((err) => {
            console.log(err)
        })

    }

    return (
        <Fragment>
            <TransitionGroup>
                <CSSTransition component="div" classNames="TabsAnimation" appear={true}
                    timeout={0} enter={false} exit={false}>
                    {/* style={{background: "blue"}} */}
                    <div>
                        <Card className="main-card mb-3">
                            <Sticky enabled={true} top=".app-header" innerZ="15" activeClass="sticky-active-class">
                            <CardHeader className="card-header-md">
                                <div className="card-header-title font-size-lg text-capitalize fw-bolder">
                                Work Diary
                                </div>
                                <div className="btn-actions-pane-right">
                                <Button size="lg" color="warning" className="me-2" onClick={createNewDiary}>
                                    Create new diary
                                </Button>
                                {/* <UncontrolledButtonDropdown>
                                    <Button size="lg" color="primary">
                                    <span className="me-2 opacity-6">
                                        <FontAwesomeIcon icon={faCog} />
                                    </span>
                                    Actions
                                    </Button>
                                    <DropdownToggle className="dropdown-toggle-split" caret size="lg" color="primary"/>
                                    <DropdownMenu end>
                                    <DropdownItem>Menus</DropdownItem>
                                    <DropdownItem>Settings</DropdownItem>
                                    <DropdownItem header>Header</DropdownItem>
                                    <DropdownItem>Actions</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Dividers</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown> */}
                                </div>
                            </CardHeader>
                            </Sticky>
                            <CardBody className="pt-4">
                            <Col md="8" className="mx-auto">
                                <Row>
                                    <Col md="6">
                                        <FormGroup> 
                                            <Label for="exampleEmail">Title</Label>
                                            <Input bsSize={"lg"} value={diary.title} type="text" name="title" id="diaryTitle" placeholder="Diary Title"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="exampleCustomSelect">Time</Label>
                                            <Input value={diary.time} type="select" size={"lg"} id="diaryTime" name="time" onChange={handleChange}>
                                                {
                                                    time.map((v) => {
                                                        return <option key={v} value={v}>{v}</option>
                                                    })
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Label for="exampleEmail">Activity</Label>
                                    <Input bsSize={"lg"} type="textarea" value={diary.activity} name="activity" id="diaryActivity" placeholder="Your activity today..."
                                    onChange={handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleAddress">Objective</Label>
                                    <Input type="textarea" bsSize={"lg"} value={diary.objective} name="objective" id="diaryObjective" placeholder="What is the objective?"
                                    onChange={handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleAddress2">Result</Label>
                                    <Input type="text" bsSize={"lg"} value={diary.result} name="result" id="diaryResult" placeholder="Acitvity result..."
                                    onChange={handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Note</Label>
                                    <Input bsSize={"lg"} type="email" value={diary.note} name="note" id="diaryNote" placeholder="Some note..."
                                    onChange={handleChange}/>
                                </FormGroup>
                                {/* <FormGroup>
                                <Label for="exampleCustomSelect">Custom Select</Label>
                                <Input type="select" id="exampleCustomSelect" name="customSelect">
                                    <option value="">Select</option>
                                    <option>Value 1</option>
                                    <option>Value 2</option>
                                    <option>Value 3</option>
                                    <option>Value 4</option>
                                    <option>Value 5</option>
                                </Input>
                                </FormGroup>
                                <FormGroup>
                                <Label for="exampleCustomMutlipleSelect">
                                    Custom Multiple Select
                                </Label>
                                <Input type="select" id="exampleCustomMutlipleSelect" name="customSelect" multiple>
                                    <option value="">Select</option>
                                    <option>Value 1</option>
                                    <option>Value 2</option>
                                    <option>Value 3</option>
                                    <option>Value 4</option>
                                    <option>Value 5</option>
                                </Input>
                                </FormGroup>
                                <FormGroup>
                                <Label for="exampleCustomSelectDisabled">
                                    Custom Select Disabled
                                </Label>
                                <Input type="select" id="exampleCustomSelectDisabled" name="customSelect" disabled>
                                    <option value="">Select</option>
                                    <option>Value 1</option>
                                    <option>Value 2</option>
                                    <option>Value 3</option>
                                    <option>Value 4</option>
                                    <option>Value 5</option>
                                </Input>
                                </FormGroup>
                                <FormGroup>
                                <Label for="exampleCustomMutlipleSelectDisabled">
                                    Custom Multiple Select Disabled
                                </Label>
                                <Input type="select" id="exampleCustomMutlipleSelectDisabled" name="customSelect" multiple disabled>
                                    <option value="">Select</option>
                                    <option>Value 1</option>
                                    <option>Value 2</option>
                                    <option>Value 3</option>
                                    <option>Value 4</option>
                                    <option>Value 5</option>
                                </Input>
                                </FormGroup> */}
                            </Col>
                            </CardBody>
                            <CardFooter className="d-block text-center">
                            {/* <Button size="sm" className="me-2" color="link">
                                Cancel
                            </Button> */}
                            <Button size="lg" color="success" onClick={saveUpdateDiary}>
                                Save
                            </Button>
                            </CardFooter>
                        </Card>
                        </div>
                </CSSTransition>
            </TransitionGroup>
        </Fragment>
);
}

export default WorkDiary;