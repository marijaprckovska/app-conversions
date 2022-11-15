import React,{Component} from 'react';
import {variables} from './Variables.js';

export class MeasureTypes extends Component{

    constructor(props){
        super(props);

        this.state={
            measuretypes:[],
            modalTitle:"",
            mty_sCode:"",
            mty_nAutoinc:0,

            mty_nAutoincFilter:"",
            mty_sCodeFilter:"",
            measuretypesWithoutFilter:[]
        }
    }

    FilterFn(){
        var mty_nAutoincFilter=this.state.mty_nAutoincFilter;
        var mty_sCodeFilter = this.state.mty_sCodeFilter;

        var filteredData=this.state.measuretypesWithoutFilter.filter(
            function(el){
                return el.mty_nAutoinc.toString().toLowerCase().includes(
                    mty_nAutoincFilter.toString().trim().toLowerCase()
                )&&
                el.mty_sCode.toString().toLowerCase().includes(
                    mty_sCodeFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({measuretypes:filteredData});

    }

    sortResult(prop,asc){
        var sortedData=this.state.measuretypesWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({measuretypes:sortedData});
    }

    changemty_nAutoincFilter = (e)=>{
        this.state.mty_nAutoincFilter=e.target.value;
        this.FilterFn();
    }
    changemty_sCodeFilter = (e)=>{
        this.state.mty_sCodeFilter=e.target.value;
        this.FilterFn();
    }

    refreshList(){
        fetch(variables.API_URL+'measureTypes')
        .then(response=>response.json())
        .then(data=>{
            this.setState({measuretypes:data,measuretypesWithoutFilter:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changemty_sCode =(e)=>{
        this.setState({mty_sCode:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Measure Type",
            mty_nAutoinc:0,
            mty_sCode:""
        });
    }
    editClick(mtypes){
        this.setState({
            modalTitle:"Edit Measure Type",
            mty_nAutoinc:mtypes.mty_nAutoinc,
            mty_sCode:mtypes.mty_sCode
        });
    }

    createClick(){
        fetch(variables.API_URL+'measureTypes',{
            method:'POST',
            headers:{

                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                mty_sCode:this.state.mty_sCode
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
        fetch(variables.API_URL+'measureTypes',{
            method:'PUT',
            headers:{

                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                mty_nAutoinc:this.state.mty_nAutoinc,
                mty_sCode:this.state.mty_sCode
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
        fetch(variables.API_URL+'measureTypes/'+id,{
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
            measuretypes,
            modalTitle,
            mty_nAutoinc,
            mty_sCode
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Measure Type
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">

            
            <input className="form-control m-2"
            onChange={this.changemty_nAutoincFilter}
            placeholder="Filter"/>
            
            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mty_nAutoinc',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mty_nAutoinc',false)}>
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
            onChange={this.changemty_sCodeFilter}
            placeholder="Filter"/>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mty_sCode',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('mty_sCode',false)}>
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
        {measuretypes.map(mtypes=>
            <tr key={mtypes.mty_nAutoinc}>
                <td>{mtypes.mty_nAutoinc}</td>
                <td>{mtypes.mty_sCode}</td>
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
                onClick={()=>this.deleteClick(mtypes.mty_nAutoinc)}>
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
       <div className="input-group mb-3">
        <span className="input-group-text">mty_sCode</span>
        <input type="text" className="form-control"
        value={mty_sCode}
        onChange={this.changemty_sCode}/>
       </div>

        {mty_nAutoinc==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {mty_nAutoinc!=0?
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
export default MeasureTypes;