import React , {useState} from 'react';
import {Bar} from 'react-chartjs-2';


const barChart = (props) =>{
    const optionChar = [ "A" ,"B","C","D" ]
    const responed = (list) =>{
        var sum = 0;
        list.forEach((i)=>{
            sum+=i
        });
        return sum;
    }

    const pollDunction = (list) =>{
        var _ = [];
        list.forEach((i)=>{
            _.push( i / responed(list) *100 )
        });
        return _;
    }

    const labelsFunc = () =>{
        var _ = []
        
        for (var i = 0; i<props.optionNumber;i++){
            _.push( `${optionChar[i]} ( ${props.poll[i]} )` )            
        }
        return _
    }

    return(
        <div>

            <h5 className="card-title font ">{  props.poll ? responed(props.poll) : 0 } student responeded out of { props.data ? props.data.length : 0 }</h5>
            <Bar

                data = {{
                    labels : labelsFunc(),
                    
                    datasets : [ {
                        label : 'Votes',
                        data :  props.poll ? pollDunction(props.poll) : ()=>{
                                                var _ = [];
                            for (var i; i<props.optionNumber;i++){
                                _.push(0);
                            }
                            return _
                        } ,
                        backgroundColor : "#ffba08",
                        borderColor : "#faa307",
                        borderWidth : 1.5
                    } ]

                }}

            height = {300}
            width = { 600 }
            options = {{
                maintainAspectRatio :true,
                scales : {
                    yAxes : [
                        {
                            ticks:{
                                beginAtZero : true,
                                max : 100
                            }
                        }
                    ],
                    xAxes : [
                        {
                            barPercentage : 0.4
                        }
                    ]
                }
            }}
            >
                
            </Bar>
        </div>
    )
}

export default barChart;