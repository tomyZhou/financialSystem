import React, {Component} from 'react';
import Record from './Record';
// import {getJSON} from 'jquery'; //按需导入
// import axios from 'axios';
import PropTypes from 'prop-types';
import *  as RecordsAPI from '../utils/RecordsAPI';
import {RecordForm} from "./RecordForm";
import AmountBox from "./AmountBox";

class Records extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoad: false,
            records: [
                // {"id": 1, "date": "2018-01-09", "title": "收入1", "amount": 20},
                // {"id": 2, "date": "2018-01-10", "title": "收入2", "amount": 22},
                // {"id": 3, "date": "2018-01-11", "title": "收入3", "amount": 24},
                // {"id": 4, "date": "2018-01-12", "title": "收入4", "amount": 30}
            ]

        }
    }

    componentDidMount() {

        //1.使用jQuery请求数据
        // getJSON("https://5ad831de42a4a50014d5f321.mockapi.io/api/v1/records").then(
        //     response => this.setState({
        //         records: response,
        //         isLoad: true
        //     }),
        //     error => this.setState({
        //         isLoad: true,
        //         error
        //     })
        // )

        //2.使用axios请求数据
        // axios.get("https://5ad831de42a4a50014d5f321.mockapi.io/api/v1/records").then(
        RecordsAPI.getAll().then(
            response => this.setState({
                records: response.data,
                isLoad: true
            })
        ).catch(
            error => this.setState({
                isLoad: true,
                error
            }),
            console.log(this.state.error)
        )
    }

    handleAddRecord(record) {
        console.log(record);

        const a = [{"a": "11", "b": "22"}];
        const b = {"a": "33", "b": "44"}
        const c = [...a, b];
        console.log(c)


        this.setState({
            error: null,
            isLoaded: true,
            records: [
                ...this.state.records,
                record
            ]
        })

        // this.setState = ({  这儿语法错了！！！
        //     error: null,
        //     isLoad: true,
        //     records: [
        //         ...this.state.records,
        //         record
        //     ]
        // });
        console.log(this.state.records);
    }

    onUpdate(oldRecord, newRecord) {
        const updateIndex = this.state.records.indexOf(oldRecord);

        console.log("更新第" + updateIndex);
        console.log(oldRecord);
        console.log(newRecord);
        const newRecords = this.state.records.map((record, index) => {
            if (index !== updateIndex) {
                return record;
            } else {
                return {...record, ...newRecord};
            }
        });

        this.setState({
            records: newRecords
        });
    }

    onDelete(record) {
        const deleteIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.filter((item, index) => index !== deleteIndex);

        this.setState({
            records: newRecords
        })
    }

    //计算金额
    onCompute(type) {
        let credit = 0, debits = 0, balance = 0;

        this.state.records.map((record) => {
            if (record.amount >= 0) {
                credit = credit + record.amount;
            } else if (record.amount < 0) {
                debits = debits + record.amount;
            }
            balance = credit + debits;
        });

        if (type === 1) {
            return credit;
        } else if (type === 2) {
            return debits;
        } else {
            return balance;
        }
    }

    render() {
        const {error, isLoad, records} = this.state;  //声明3个常量
        let recordComponent;
        if (error) {
            recordComponent = <div>Error:{error.message}</div>
        } else if (!isLoad) {
            recordComponent = <div>Loading...</div>
        } else {
            recordComponent =
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        records.map((record, index) =>
                            <Record key={index} record={record}
                                    onUpdate={this.onUpdate.bind(this)}
                                    onDelete={this.onDelete.bind(this)}/>)
                    }
                    </tbody>
                </table>

        }
        return (
            <div>
                <h1>Records</h1>
                <div className="row mb-3">
                    <AmountBox title="Credit" type="success" amount={this.onCompute(1)}/>
                    <AmountBox title="Debits" type="danger" amount={this.onCompute(2)}/>
                    <AmountBox title="Balance" type="info" amount={this.onCompute(3)}/>

                </div>
                <RecordForm addRecord={this.handleAddRecord.bind(this)}/>
                {recordComponent}
            </div>
        )

    }
}

export default Records;

Records.ProTypes = {
    id: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.number
}