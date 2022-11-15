import React,{Component} from 'react';
import {variables} from './Variables.js';

export class MeasureUnits extends Component{

    constructor(props){
        super(props);

        this.state={
            measureTypes:[],  // ova e tabela od koja se povikuva podatok
            measureUnits:[],  // ova e tabela od koja se raboti
            modalTitle:"",
                        
            mun_nAutoinc:0,
            mun_sCode:"",
            mun_sSymbol:"",
            mun_sMeasureType:"",
            
            mun_nAutoincFilter:"",
            mun_sCodeFilter:"",
            mun_sMeasureTypeFilter:"",
            mun_sSymbolFilter:"",
            measureUnitsWithoutFilter:[],
            measureTypesWithoutFilter:[]

        }
    }


    FilterFn(){
        var mun_nAutoincFilter=this.state.mun_nAutoincFilter;
        var mun_sCodeFilter = this.state.mun_sCodeFilter;
        var mun_sMeasureTypeFilter = this.state.mun_sMeasureTypeFilter;
        var mun_sSymbolFilter = this.state.mun_sSymbolFilter;

        var filteredData=this.state.measureUnitsWithoutFilter.filter(
            function(el){
                return el.mun_nAutoinc.toString().toLowerCase().includes(
                    mun_nAutoincFilter.toString().trim().toLowerCase()
                )&&
                el.mun_sCode.toString().toLowerCase().includes(
                    mun_sCodeFilter.toString().trim().toLowerCase()
                )&&
                el.mun_sMeasureType.toString().toLowerCase().includes(
                  mun_sMeasureTypeFilter.toString().trim().toLowerCase()
                )&&
                el.mun_sSymbol.toString().toLowerCase().includes(
                  mun_sSymbolFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({measureUnits:filteredData});

    }

    sortResult(prop,asc){
        var sortedData=this.state.measureUnitsWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({measureUnits:sortedData});
    }

    changemun_nAutoincFilter = (e)=>{
        this.state.mun_nAutoincFilter=e.target.value;
        this.FilterFn();
    }
    changemun_sCodeFilter = (e)=>{
        this.state.mun_sCodeFilter=e.target.value;
        this.FilterFn();
    } 
    changemun_sSymbol = (e)=>{
        this.state.mun_sSymbol=e.target.value;
        this.FilterFn();
    }
    changemun_sMeasureTypeFilter = (e)=>{
        this.state.mun_sMeasureTypeFilter=e.target.value;
        this.FilterFn();
    }


    refreshList(){

        fetch(variables.API_URL+'measureUnits')
        .then(response=>response.json())
        .then(data=>{
            this.setState({measureUnits:data,measureUnitsWithoutFilter:data});
        });                                          // ova e tabelata vo koja se raboti

        fetch(variables.API_URL+'measureTypes')
        .then(response=>response.json())
        .then(data=>{
            this.setState({measureTypes:data, measureUnitsWithoutFilter:data});
        });                                          // ova e tabela od koja se povikuva podatok  

    }

    componentDidMount(){
        this.refreshList();
    }
    
    changemun_sCode =(e)=>{
        this.setState({mun_sCode:e.target.value});
    }
    changemun_sSymbol =(e)=>{
        this.setState({mun_sSymbol:e.target.value});
    }
    changemun_sMeasureType =(e)=>{
        this.setState({mun_sMeasureType:e.target.value});
    }
    

    addClick(){
        this.setState({
            modalTitle:"Add Measure Unit",
            
            mun_nAutoinc:0,
            mun_sCode:"",
            mun_sSymbol:"",
            mun_sMeasureType:""

        });
    }
    editClick(mdt){
        this.setState({
            modalTitle:"Edit Measure Unit",

            mun_nAutoinc:mdt.mun_nAutoinc,
            mun_sCode:mdt.mun_sCode,
            mun_sSymbol:mdt.mun_sSymbol,
            mun_sMeasureType:mdt.mun_sMeasureType

        });
    }

    createClick(){
        fetch(variables.API_URL+'measureUnits',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({

                mun_nAutoinc:this.state.mun_nAutoinc,
                mun_sCode:this.state.mun_sCode,
                mun_sSymbol:this.state.mun_sSymbol,
                mun_sMeasureType:this.state.mun_sMeasureType
    

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
        fetch(variables.API_URL+'measureUnits',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({

                mun_nAutoinc:this.state.mun_nAutoinc,
                mun_sCode:this.state.mun_sCode,
                mun_sSymbol:this.state.mun_sSymbol,
                mun_sMeasureType:this.state.mun_sMeasureType

                
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
        fetch(variables.API_URL+'measureUnits/'+id,{
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

            measureTypes,
            measureUnits,
            modalTitle,
                        
            mun_nAutoinc,
            mun_sCode,
            mun_sSymbol,
            mun_sMeasureType

            
        }=this.state;


        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Measure Unit
    </button>
    <table className="table table-striped">
    

    <thead>
	
    <tr>
        <th>
            <div className="d-flex flex-row">
            <input className="form-control m-2"
            onChange={this.changemun_nAutoincFilter}
            placeholder="Filter"/>
            
            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mun_nAutoinc',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mun_nAutoinc',false)}>
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
            onChange={this.changemun_sCodeFilter}
            placeholder="Filter"/>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mun_sCode',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mun_sCode',false)}>
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
            onChange={this.changemun_sSymbolFilter}
            placeholder="Filter"/>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mun_sSymbol',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mun_sSymbol',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            symbol
        </th>
        <th>
        <div className="d-flex flex-row">
        <input className="form-control m-2"
            onChange={this.changemun_sMeasureTypeFilter}
            placeholder="Filter"/>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mun_sMeasureType',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mun_sMeasureType',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            type
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>   



    <tbody>
        {measureUnits.map(mdt=>
            <tr key={mdt.mun_nAutoinc}>
                <td>{mdt.mun_nAutoinc}</td>
                <td>{mdt.mun_sCode}</td>
                <td>{mdt.mun_sSymbol}</td>
                <td>{mdt.mun_sMeasureType}</td>
                
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(mdt)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(mdt.mun_nAutoinc)}>
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
    < div className="d-flex flex-row bd-highlight mb-3">
     
     <div className="p-2 w-50 bd-highlight">
    
     <div className="input-group mb-3">
            <span className="input-group-text">mun_sCode</span>
            <input type="text" className="form-control"
            value={mun_sCode}
            onChange={this.changemun_sCode}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">mun_sSymbol</span>
            <input type="text" className="form-control"
            value={mun_sSymbol}
            onChange={this.changemun_sSymbol}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">mun_sMeasureType</span>
            <select className="form-select"
            onChange={this.changemun_sMeasureType}
            value={mun_sMeasureType}>
                {measureTypes.map(dep=><option key={dep.mty_nAutoinc}>
                    {dep.mty_sCode}
                </option>)}
            </select>
        </div>
		

    </div>
    </div>
     
    

    {mun_nAutoinc==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

    {mun_nAutoinc!=0?
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

export default MeasureUnits;