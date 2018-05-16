import React, {Component} from 'react';

/**
 * import 是针对 export 的。
 *
 * 按 es6 的规范 import * as obj from "xxx" 会将 "xxx" 中所有 export 导出的内容组合成一个对象返回。
 * 如果都使用 es6 的规范，这个是很明确的。
 */
import * as RecordsAPI from '../utils/RecordsAPI';

export class RecordForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: "",
            title: "",
            amount: ""
        }
    }

    valid() {
        return this.state.date && this.state.title && this.state.amount;
    }

    onChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value   //给控件自己赋值
        })
    }

    handleSubmit(event) {
        event.preventDefault(); //屏蔽onSubmit默认的GET请求事件

        const data = {
            date: this.state.date,
            title: this.state.title,
            amount: Number.parseInt(this.state.amount, 0)
        };

        RecordsAPI.addRecords(data).then(
            response => {
                this.props.addRecord(response.data);
                this.setState({
                    date: "",
                    title: "",
                    amount: ""
                })
            }
        ).catch(
            error => console.log(error.message)
        )

    }

    render() {
        return (
            <form className="form-inline mb-3" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group mr-2">
                    <input type="text" className="form-control" placeholder="Date" name="date" value={this.state.date}
                           onChange={this.onChange.bind(this)}/>
                </div>
                <div className="form-group mr-2">
                    <input type="text" className="form-control" placeholder="Title" name="title"
                           value={this.state.title} onChange={this.onChange.bind(this)}/>
                </div>
                <div className="form-group mr-2">
                    <input type="text" className="form-control" placeholder="Amount" name="amount"
                           value={this.state.amount} onChange={this.onChange.bind(this)}/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
            </form>
        );
    }
}

