import React, {Component} from 'react';
import * as RecordsAPI from '../utils/RecordsAPI'

class Record extends Component {
    constructor() {
        super();
        this.state = {
            editable: false
        }
    }

    onEdit() {
        this.setState({
                editable: !this.state.editable
            }
        )
    }

    onDelete() {
        console.log("delete");
        RecordsAPI.deleteRecords(this.props.record.id).then(
            response => this.props.onDelete(this.props.record)
        ).catch(
            error => console.log(error.message)
        )
    }

    onUpdate(event) {
        event.preventDefault();
        const record = {
            date: this.refs.date.value,
            title: this.refs.title.value,
            amount: Number.parseInt(this.refs.amount.value, 0)
        }
        console.log(record);
        RecordsAPI.updateRecords(this.props.record.id, record).then(
            response => {
                this.setState({
                    editable: false
                });
                this.props.onUpdate(this.props.record, response.data);
            }
        ).catch(
            error => console.log(error.message)
        )
    }


    showRecord() {
        return (
            <tr key={this.props.record.id}>
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{this.props.record.amount}</td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.onEdit.bind(this)}>Edit</button>
                    <button className="btn btn-danger" onClick={this.onDelete.bind(this)}>Delete</button>
                </td>
            </tr>
        )
    }

    eidtRecord() {
        return (
            <tr key={this.props.record.id}>
                <td><input type="text" className="form-control" defaultValue={this.props.record.date} ref="date"/></td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.title} ref="title"/>
                </td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.amount} ref="amount"/>
                </td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.onUpdate.bind(this)}>Update</button>
                    <button className="btn btn-danger" onClick={this.onEdit.bind(this)}>Cancel</button>
                </td>
            </tr>
        );
    }

    render() {
        if (this.state.editable) {
            return this.eidtRecord();
        } else {
            return this.showRecord();
        }
    }
}

export default Record;

