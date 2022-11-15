import React,{Component} from 'react';
import {variables} from './Variables.js';

export class MeasureCultures extends Component{

    constructor(props){
        super(props);

        this.state={
            measureTypes:[],          // ova e tabela od koja se povikuva podatok
            
            measureUnits:[],          // ova e tabela od koja se povikuva podatok

            measureCultures:[],    // ova e tabela od koja se raboti
            modalTitle:"",
                        
            mcl_nAutoinc:0,          // ova se atributite vo tabela od koja se raboti
            mcl_sCulture:"",       // ova se atributite vo tabela od koja se raboti
            mcl_sDefaultMeasureType:"",        // ova se atributite vo tabela od koja se raboti
            mcl_sDefaultMeasureUnit:"",   // ova se atributite vo tabela od koja se raboti

            mcl_nAutoincFilter:"",          // ova se atributite SO FILTER
            mcl_sCultureFilter:"",       // ova se atributite od tabela SO FILTER
            mcl_sDefaultMeasureTypeFilter:"",        // ova se atributite vo tabela SO FILTER
            mcl_sDefaultMeasureUnitFilter:"",  // ova se atributite vo tabela SO FILTER
            measureTypesWithoutFilter:[], // BEZ FILTER
            measureUnitsWithoutFilter:[], // BEZ FILTER
            measureCulturesWithoutFilter:[]  // BEZ FILTER
        }
    }
    FilterFn(){
        var mcl_nAutoincFilter=this.state.mcl_nAutoincFilter;
        var mcl_sCultureFilter = this.state.mcl_sCultureFilter;
        var mcl_sDefaultMeasureUnitFilter = this.state.mcl_sDefaultMeasureUnitFilter;
        var mcl_sDefaultMeasureTypeFilter = this.state.mcl_sDefaultMeasureTypeFilter;

        var filteredData=this.state.measureCulturesWithoutFilter.filter(
            function(el){
                return el.mcl_nAutoinc.toString().toLowerCase().includes(
                    mcl_nAutoincFilter.toString().trim().toLowerCase()
                )&&
                el.mcl_sCulture.toString().toLowerCase().includes(
                    mcl_sCultureFilter.toString().trim().toLowerCase()
                )&&
                el.mcl_sDefaultMeasureUnit.toString().toLowerCase().includes(
                  mcl_sDefaultMeasureUnitFilter.toString().trim().toLowerCase()
                )&&
                el.mcl_sDefaultMeasureType.toString().toLowerCase().includes(
                  mcl_sDefaultMeasureTypeFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({measureCultures:filteredData});

    }

    sortResult(prop,asc){
        var sortedData=this.state.measureCulturesWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({measureCultures:sortedData});
    }

    changemcl_nAutoincFilter = (e)=>{
        this.state.mcl_nAutoincFilter=e.target.value;
        this.FilterFn();
    }
    changemcl_sCultureFilter = (e)=>{
        this.state.mcl_sCultureFilter=e.target.value;
        this.FilterFn();
    }
    changemcl_sDefaultMeasureUnitFilter = (e)=>{
        this.state.mcl_sDefaultMeasureUnitFilter=e.target.value;
        this.FilterFn();
    } 
    changemcl_sDefaultMeasureType = (e)=>{
        this.state.mcl_sDefaultMeasureType=e.target.value;
        this.FilterFn();
    }

    refreshList(){

        fetch(variables.API_URL+'measureCultures')
        .then(response=>response.json())
        .then(data=>{
            this.setState({measureCultures:data, measureCulturesWithoutFilter:data});
        });                                          // ova e tabela od koja se raboti

        fetch(variables.API_URL+'measureTypes')
        .then(response=>response.json())
        .then(data=>{
            this.setState({measureTypes:data});
        });                                           // ova e tabela od koja se povikuva podatok

        fetch(variables.API_URL+'measureUnits')
        .then(response=>response.json())
        .then(data=>{
            this.setState({measureUnits:data});
        });                                            // ova e tabela od koja se povikuva podatok
    }



    componentDidMount(){
        this.refreshList();
    }                                          // ova e atributite od tabela vo koja se raboti
    changemcl_sCulture =(e)=>{   
        this.setState({mcl_sCulture:e.target.value});
    }
    changemcl_sDefaultMeasureType =(e)=>{
        this.setState({mcl_sDefaultMeasureType:e.target.value});
    }
    changemcl_sDefaultMeasureUnit =(e)=>{
        this.setState({mcl_sDefaultMeasureUnit:e.target.value});
    }
    

    addClick(){
        this.setState({
            modalTitle:"Add Default Measure Unit",
            
            mcl_nAutoinc:0,
            mcl_sCulture:"",
            mcl_sDefaultMeasureType:"",
            mcl_sDefaultMeasureUnit:""

        });
    }
    editClick(mdt){
        this.setState({
            modalTitle:"Edit Default Measure Unit",

            mcl_nAutoinc:mdt.mcl_nAutoinc,
            mcl_sCulture:mdt.mcl_sCulture,
            mcl_sDefaultMeasureType:mdt.mcl_sDefaultMeasureType,
            mcl_sDefaultMeasureUnit:mdt.mcl_sDefaultMeasureUnit

        });
    }

    createClick(){
        fetch(variables.API_URL+'measureCultures',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({

                mcl_nAutoinc:this.state.mcl_nAutoinc,
                mcl_sCulture:this.state.mcl_sCulture,
                mcl_sDefaultMeasureType:this.state.mcl_sDefaultMeasureType,
                mcl_sDefaultMeasureUnit:this.state.mcl_sDefaultMeasureUnit
    

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
        fetch(variables.API_URL+'measureCultures',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({

                mcl_nAutoinc:this.state.mcl_nAutoinc,
                mcl_sCulture:this.state.mcl_sCulture,
                mcl_sDefaultMeasureType:this.state.mcl_sDefaultMeasureType,
                mcl_sDefaultMeasureUnit:this.state.mcl_sDefaultMeasureUnit

                
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
        fetch(variables.API_URL+'measureCultures/'+id,{
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

            measureTypes,         // ova e tabela od koja se povikuva podatok

            measureUnits,           // ova e tabela od koja se povikuva podatok

            measureCultures,    // ova e tabela od koja se raboti
            modalTitle,
                        
            mcl_nAutoinc,
            mcl_sCulture,
            mcl_sDefaultMeasureType,
            mcl_sDefaultMeasureUnit

        }=this.state;


        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Culture
    </button>


    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">
            <input className="form-control m-2"
            onChange={this.changemcl_nAutoincFilter}
            placeholder="Filter"/>
            
            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mcl_nAutoinc',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mcl_nAutoinc',false)}>
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
            onChange={this.changemcl_sCultureFilter}
            placeholder="Filter"/>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mcl_sCulture',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mcl_sCulture',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            originculture
        </th>
        <th>
        <div className="d-flex flex-row">
        <input className="form-control m-2"
            onChange={this.changemcl_sDefaultMeasureTypeFilter}
            placeholder="Filter"/>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mcl_sDefaultMeasureType',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mcl_sDefaultMeasureType',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            type
        </th>
        <th>
        <div className="d-flex flex-row">
        <input className="form-control m-2"
            onChange={this.changemcl_sDefaultMeasureUnitFilter}
            placeholder="Filter"/>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mcl_sDefaultMeasureUnit',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mcl_sDefaultMeasureUnit',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            measureunit
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
	


    <tbody>
        {measureCultures.map(mdt=>
            <tr key={mdt.mcl_nAutoinc}>
                <td>{mdt.mcl_nAutoinc}</td>
                <td>{mdt.mcl_sCulture}</td>
                <td>{mdt.mcl_sDefaultMeasureType}</td>
                <td>{mdt.mcl_sDefaultMeasureUnit}</td>
                
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
                onClick={()=>this.deleteClick(mdt.mcl_nAutoinc)}>
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
            <span className="input-group-text">mcl_sCulture</span>
            <input type="text" className="form-control"
            value={mcl_sCulture}
            onChange={this.changemcl_sCulture}/>
        </div>

    
     <div className="input-group mb-3">
            <span className="input-group-text">mcl_sDefaultMeasureUnit</span>
            <select className="form-select"
            onChange={this.changemcl_sDefaultMeasureUnit}
            value={mcl_sDefaultMeasureUnit}>
                {measureUnits.map(dep=><option key={dep.mun_nAutoinc}>
                    {dep.mun_sCode}
                </option>)}
            </select>
        </div>


        <div className="input-group mb-3">
            <span className="input-group-text">mcl_sDefaultMeasureType</span>
            <select className="form-select"
            onChange={this.changemcl_sDefaultMeasureType}
            value={mcl_sDefaultMeasureType}>
                {measureTypes.map(dep=><option key={dep.mty_nAutoinc}>
                    {dep.mty_sCode}
                </option>)}
            </select>
        </div>                                            


    </div>
    </div>
     
    

    {mcl_nAutoinc==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

    {mcl_nAutoinc!=0?
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
export default MeasureCultures;