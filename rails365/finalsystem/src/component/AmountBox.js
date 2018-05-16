import React from 'react'

//无状态组件
const AmountBox = ({title, type, amount}) => {
    return (
        <div className="col">
            <div className="card">
                <div className={`card-header bg-${type} text-white`}>
                    {title}
                </div>
                <div className="card-body">
                    {amount}
                </div>
            </div>
        </div>
    )
}
export default AmountBox