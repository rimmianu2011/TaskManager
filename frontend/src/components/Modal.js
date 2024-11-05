import React, {Component} from "react";
import{
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Row, Col,
} from "reactstrap";
import '../App.css';


export default class CustomModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
    }


    handleChange = (e) => {
        let {name, value} = e.target;

        if(e.target.type === "checkbox"){
            value = e.target.checked;
        }

        const activeItem = { ...this.state.activeItem, [name]: value};

        this.setState({activeItem});
    };

    render(){
        const {toggle, onSave} = this.props;

        return(
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>ToDo Items</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="todo-title">Title</Label>
                            <Input 
                            type="text" 
                            id="todo-title" 
                            name="title_model" 
                            value={this.state.activeItem.title_model} 
                            onChange={this.handleChange} 
                            placeholder="Enter Todo Title">
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="todo-description">Description</Label>
                            <Input
                            type="text"
                            id="todo-description"
                            name="description_model"
                            value={this.state.activeItem.description_model}
                            onChange={this.handleChange}
                            placeholder="Enter the Description">
                            </Input>
                        </FormGroup>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="todo-due-date">Due Date</Label>
                                    <Input
                                        type="date"
                                        id="todo-due-date"
                                        name="due_date"
                                        value={this.state.activeItem.due_date || ''}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="todo-priority">Priority</Label>
                                    <Input
                                        type="select"
                                        id="todo-priority"
                                        name="priority"
                                        value={this.state.activeItem.priority || ''}
                                        onChange={this.handleChange}
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            </Row>
                        <FormGroup check className="my-3">
                            <Label check>
                                <Input
                                type= "checkbox"
                                name="completed_task"
                                checked={this.state.activeItem.completed_task}
                                onChange={this.handleChange}>
                                </Input>
                                {' '}Completed
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => onSave(this.state.activeItem)}>
                        Save Item
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}