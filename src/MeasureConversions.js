import React,{Component} from 'react';
import {variables} from './Variables.js';

export class MeasureConversions extends Component{

    constructor(props){
        super(props);

        this.state={
            measureConversions:[],// ova e tabela od koja se raboti
            measureUnits:[], // ova e tabela od koja se povikuva podatok
            modalTitle:"",
           
            mcn_sMeasureUnitCode:"",
            mcn_sFormula:"",
            mcn_nAutoinc:0,

            mcn_nAutoincFilter:"",
            mcn_sMeasureUnitCodeFilter:"",
            mcn_sFormulaFilter:"",
            measureConversionsWithoutFilter:[],
            measureUnitsWithoutFilter:[]
        }
    }

    FilterFn(){
        var mcn_nAutoincFilter=this.state.mcn_nAutoincFilter;
        var mcn_sMeasureUnitCodeFilter = this.state.mcn_sMeasureUnitCodeFilter;
        
        var mcn_sFormulaFilter = this.state.mcn_sFormulaFilter;

        var filteredData=this.state.measureConversionsWithoutFilter.filter(
            function(el){
                return el.mcn_nAutoinc.toString().toLowerCase().includes(
                    mcn_nAutoincFilter.toString().trim().toLowerCase()
                )&&
                el.mcn_sMeasureUnitCode.toString().toLowerCase().includes(
                    mcn_sMeasureUnitCodeFilter.toString().trim().toLowerCase()
                )&&
                
                el.mcn_sFormula.toString().toLowerCase().includes(
                  mcn_sFormulaFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({measureConversions:filteredData});

    }

    sortResult(prop,asc){
        var sortedData=this.state.measureConversionsWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({measureConversions:sortedData});
    }

    changemcn_nAutoincFilter = (e)=>{
        this.state.mcn_nAutoincFilter=e.target.value;
        this.FilterFn();
    }
    changemcn_sMeasureUnitCodeFilter = (e)=>{
        this.state.mcn_sMeasureUnitCodeFilter=e.target.value;
        this.FilterFn();
    }
    
    changemcn_sFormula = (e)=>{
        this.state.mcn_sFormula=e.target.value;
        this.FilterFn();
    }


    refreshList(){

        fetch(variables.API_URL+'measureConversions')
        .then(response=>response.json())
        .then(data=>{
            this.setState({measureConversions:data,measureConversionsWithoutFilter:data});
        });                      
                                              // ova e tabelata vo koja se raboti

        fetch(variables.API_URL+'measureUnits')
        .then(response=>response.json())
        .then(data=>{
            this.setState({measureUnits:data,measureUnitsWithoutFilter:data});
        });   
                                  // ova e tabela od koja se povikuva podatok 
       
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changemcn_sMeasureUnitCode =(e)=>{
        this.setState({mcn_sMeasureUnitCode:e.target.value});
    }
    changemcn_sFormula =(e)=>{
        this.setState({mcn_sFormula:e.target.value});
    }
    

    addClick(){
        this.setState({
            modalTitle:"Add Measure Unit",
            mcn_nAutoinc:0,
            mcn_sMeasureUnitCode:"",
            mcn_sFormula:""
            
        });
    }
    editClick(mtypes){
        this.setState({
            modalTitle:"Edit Measure Unit",
            mcn_nAutoinc:mtypes.mcn_nAutoinc,
            mcn_sMeasureUnitCode:mtypes.mcn_sMeasureUnitCode,
            mcn_sFormula:mtypes.mcn_sFormula,
            
        });
    }

    createClick(){
        fetch(variables.API_URL+'measureConversions',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                mcn_sMeasureUnitCode:this.state.mcn_sMeasureUnitCode,
                mcn_sFormula:this.state.mcn_sFormula
                
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'measureConversions',{
            method:'PUT',
            headers:{

                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                mcn_nAutoinc:this.state.mcn_nAutoinc,
                mcn_sMeasureUnitCode:this.state.mcn_sMeasureUnitCode,
                mcn_sFormula:this.state.mcn_sFormula,
                
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'measureConversions/'+id,{
            method:'DELETE',
            headers:{

                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    render(){
        const {
            measureConversions,
            measureUnits,
            modalTitle,

            mcn_nAutoinc,
            mcn_sMeasureUnitCode,
            mcn_sFormula
            
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add UnitCode and Formula
    </button>

    <table className="table table-striped">
    
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">
            <input className="form-control m-2"
            onChange={this.changemcn_nAutoincFilter}
            placeholder="Filter"/>
            
            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mcn_nAutoinc',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mcn_nAutoinc',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>

            </div>
            index
        </th>
        <th>
        <div className="d-flex flex-row">
        <input className="form-control m-2"
            onChange={this.changemcn_sMeasureUnitCodeFilter}
            placeholder="Filter"/>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mcn_sMeasureUnitCode',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mcn_sMeasureUnitCode',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            measureunit
        </th>
        <th>
        <div className="d-flex flex-row">
        <input className="form-control m-2"
            onChange={this.changemcn_sFormulaFilter}
            placeholder="Filter"/>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mcn_sFormula',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mcn_sFormula',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            formula
        </th>
        
        <th>
            Options
        </th>
    </tr>
    </thead>

    <tbody>
        {measureConversions.map(mtypes=>
            <tr key={mtypes.mcn_nAutoinc}>
                <td>{mtypes.mcn_nAutoinc}</td>
                <td>{mtypes.mcn_sMeasureUnitCode}</td>
                <td>{mtypes.mcn_sFormula}</td>
                
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(mtypes)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(mtypes.mcn_nAutoinc)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

  

  
   <div className="modal-body">
   <div className="d-flex flex-row bd-highlight mb-3">
   <div className="p-2 w-50 bd-highlight">

       
       <div className="input-group mb-3">
        <span className="input-group-text">mcn_sFormula</span>
        <input type="text" className="form-control"
        value={mcn_sFormula}
        onChange={this.changemcn_sFormula}/>
       </div>
       
               
       <div className="input-group mb-3">
            <span className="input-group-text">mcn_sMeasureUnitCode</span>
            <select className="form-select"
            onChange={this.changemcn_sMeasureUnitCode}
            value={mcn_sMeasureUnitCode}>
                {measureUnits.map(dep=><option key={dep.mun_nAutoinc}>
                    {dep.mun_sCode}
                </option>)}
            </select>
        </div>

    </div>
    </div>

        {mcn_nAutoinc==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {mcn_nAutoinc!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}
   </div>

</div>
</div> 
</div>
</div> 




        )
    }
}
export default MeasureConversions;