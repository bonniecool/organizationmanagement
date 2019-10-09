import React from 'react';
import _ from 'lodash';
//import uploadcare from 'uploadcare-widget';
import html2canvas from 'html2canvas';

export default class PhotoCropper extends React.Component{

	state = {
		photo: 'https://ucarecdn.com/416e766c-c11d-4bcf-b7e7-de8083d0a485/',
		posX: 0,
		posY: 0,
		rotate: 0,
		scale: 1,
		velocity: 1,
		preview: false,
		cropped: '',
		dragging: false,
		dragOffset: { x: 0, y: 0 },
		init: { x: 0, y: 0 }
	}

	componentDidMount(){

		document.addEventListener('keydown', (event) => {
			//console.log(event.code);
			switch(event.code){
				case "ArrowUp":
					this.moveY(-1);
					break;
				case "ArrowDown":
					this.moveY(1);
					break;
				case "ArrowLeft":
					this.moveX(-1);
					break;
				case "ArrowRight":
					this.moveX(1);
					break;
				case "KeyQ":
					this.rotate(-1);
					break;
				case "KeyE":
					this.rotate(1);
					break;
				case "KeyW":
					this.zoom(0.01);
					break;
				case "KeyS":
					this.zoom(-0.01);
					break;
				default:
			}
		});

		document.addEventListener('keyup', (event) => {
			switch(event.code){
				default:
					this.setState({ velocity: 1 })
			}
		})


		this.myPhoto.addEventListener('touchstart', (event) => {
			const { posX, posY } = this.state;
			const e = event.changedTouches[0];
			this.dragStart(e);	
		})

		this.myPhoto.addEventListener('touchend', () => {
			this.setState({ 
				dragging: false
			});			
		})

		this.myPhoto.addEventListener('touchmove', (event) => {
			if(this.state.dragging){
				const e = event.changedTouches[0];
				this.dragMove(e);				
			}
		})

		this.myPhoto.addEventListener('mousedown', (e) => {
			this.dragStart(e);	
		})

		this.myPhoto.addEventListener('mouseup', () => {
			this.setState({ 
				dragging: false
			});			
		})

		this.myPhoto.addEventListener('mousemove', (e) => {
			if(this.state.dragging){
				this.dragMove(e);				
			}
		})
	}

	dragStart = (e) => {
		const { posX, posY } = this.state;
		this.setState({ 
			dragging: true,
			dragOffset: {
				x: e.clientX,
				y: e.clientY
			},
			init: {
				x: posX,
				y: posY
			}
		});
	}

	dragMove = (e) => {
		const { clientX, clientY } = e;
		const { x, y } = this.state.dragOffset;
		const { init } = this.state;
		const initX = init.x;
		const initY = init.y;

		this.setState({
			posX: initX + clientX - x,
			posY: initY + clientY - y
		})
	}

	componentWillUmount(){
		document.removeEventListener('keydown');
		document.removeEventListener('keyup');
	}

	moveX = (x) => {
		const velocity = this.state.velocity + 2//0.5
		this.setState({
			posX: this.state.posX + (x * velocity),
			velocity 
		})
	}

	moveY = (y) => {
		const velocity = this.state.velocity + 2//0.5
		this.setState({
			posY: this.state.posY + (y * velocity),
			velocity 
		})
	}

	rotate = (angle) => {
		const velocity = this.state.velocity;// + 1
		this.setState({
			rotate: this.state.rotate + (angle * velocity),
			velocity
		})	
	}

	zoom = (z) => {
		const velocity = this.state.velocity + 0.5
		this.setState({
			scale: this.state.scale + (z * velocity),
			velocity 
		})
	}

	handleCrop = (e) => {
		e.preventDefault();

		html2canvas(this.myFinalWrapper, {
			onrendered: function(canvas) {
				console.log("c",canvas);
    			document.body.appendChild(canvas);
			}
		});

		return;

		this.setState({ preview: true, cropped: '' }, () => {

			var blob = new Blob([this.myFinalWrapper.outerHTML], { type: "text/html"/*"image/jpeg"*/ });
			var DOMURL = window.URL || window.webkitURL || window;
			const url = DOMURL.createObjectURL(blob);
			console.log(url);
			this.setState({ cropped: url });

			var ctx = this.myCanvas.getContext('2d');

			var img = new Image();

			img.onload = () => {
				ctx.drawImage(img, 0, 0)
				console.log("DRAW");
			}

			img.src = url

			setTimeout(() => {
				console.log(this.outputFrame);
				if(!this.outputFrame) return console.log("NO INTANCE!");
				var request = this.outputFrame.getScreenshot(289, 372);

				request.onsuccess = () => {
					var newBlob = request.result;
					var newUrl = URL.createObjectURL(newBlob);
					this.setState({ cropped: newUrl })
				}
			},1000)			

			// const ucare = uploadcare.fileFrom('object', blob, { publicKey: '7f29586cbc16db1c11ad' });
			// ucare.done((file) => {
			// 	console.log("UPLOADED!", file);
			// }, 'image/jpeg', 0.9);
		});
	}

	handleChanceCheck = (key) => (e) => {
		this.setState({
			[key]: e.target.checked
		})
	}

	handleRotate = (angle) => (e) => {
		e.preventDefault();
		this.rotate(angle);
		this.setState({ velocity: 1 });
	}

	handleZoom = (scale) => (e) => {
		e.preventDefault();
		this.zoom(scale);
		this.setState({ velocity: 1 });
	}

	render(){

		const { posY, posX, rotate, scale, preview, cropped } = this.state;

		const  imgWrapperStyle = {
			position: "absolute",
			left: 0,
			zIndex: 5,
			display: (preview && _.isEmpty(cropped)) ? "hidden" : "inline-block",
		    'transform': `translate(${posX}px, ${posY}px) rotate(${rotate}deg) scale(${scale})`,
		}

		const captureWrapperStyle = { 
			position: "absolute", 
			left: 0,
			zIndex: 10 ,
			border: "thick dashed #fff",
			pointerEvents: "none",
			touchAction: "none",
    		msTouchAction: "none"
		}

		const finalWrapper = { 
			position: "relative",
			zIndex: 5,
			overflow: preview ? 'hidden' : 'initial',
			height: 372,
			width: 289
		}

		// console.log(`
		// 	POS: (${posX} | ${posY}),
		// 	ROT: (${rotate}),
		// 	VEL: ${velocity}
		// `);

		return(
			<div>
				<div style={{ position: 'absolute'}}>
                    <div className="modal fade show" style={{display: 'block', zIndex: 1051, pointerEvents: "none"}}>
                        <div className="modal-dialog modal-lg" style={{pointerEvents:"initial"}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Crop Image</h4>
                                </div>
                                <div className="modal-body">
                                	<div className="row">
                                		<div className="col-md-7">
                            				<div className="embed-responsive embed-responsive-1by1">
		                                		<div className="embed-responsive-item">
		                                			<div ref={ (ref) => this.myFinalWrapper = ref } style={ finalWrapper }>
		                                				{ !preview &&
				                                			<span style={ captureWrapperStyle }>
				                                				<img src="https://www.persofoto.com/persomat-3/images/mask_uk.png" alt=""/>
				                                			</span>
				                                		}
				                                		{ (preview && _.isEmpty(cropped))
				                                			&& <iframe 
					                            				title="frame" 
					                            				width="289" 
					                            				height="372" 
					                            				frameBorder="0" 
					                            				src={ cropped } 
					                            				alt=""/>
					                            		}
					                            		<div style={ imgWrapperStyle }>
					                                    	<img 
					                                    		draggable={ false } 
					                                    		ref={ (ref) => this.myPhoto = ref }
					                                    		src={ this.state.photo } 
					                                    		alt=""/>
					                                    </div>
				                                    </div>
			                                    </div>
		                            		</div>
                                		</div>
                                		<div className="col-md-5">
                                			<div>
		                            			<label>Controls</label>
		                            			<table className="table table-bordered">
		                            				<thead>
		                            					<tr>
		                            						<th>Action</th>
		                            						<th>Key</th>
		                            					</tr>
		                            				</thead>
		                            				<tbody>
		                            					<tr>
		                            						<td>Move</td>
		                            						<td>Arrow Keys or Drag</td>
		                            					</tr>
		                            					<tr>
		                            						<td>Rotate</td>
		                            						<td>
		                            							<div className="btn-group">
			                            							<button className="btn btn-info" onClick={ this.handleRotate(-1) }>
			                            								<i className="material-icons">rotate_left</i>
			                            							</button>
			                            							<span className="btn btn-default">
			                            								<span> Q / E </span>
			                            							</span>			                            							
			                            							<button className="btn btn-info" onClick={ this.handleRotate(1) }>
			                            								<i className="material-icons">rotate_right</i>
			                            							</button>
		                            							</div>
	                            							</td>
		                            					</tr>
		                            					<tr>
		                            						<td>Zoom</td>
		                            						<td>
		                            							<div className="btn-group">
			                            							<button className="btn btn-info" onClick={ this.handleZoom(-0.01) }>
			                            								<i className="material-icons">zoom_out</i>
			                            							</button>
			                            							<span className="btn btn-default">
			                            								<span> W / S </span>
			                            							</span>			                            							
			                            							<button className="btn btn-info" onClick={ this.handleZoom(0.01) }>
			                            								<i className="material-icons">zoom_in</i>
			                            							</button>
		                            							</div>
	                            							</td>
		                            					</tr>
		                            				</tbody>
		                            			</table>
		                            			<label>
		                            				<input type="checkbox" onClick={ this.handleChanceCheck('preview') } checked={ preview }/>
		                            				<span> Preview</span>
		                            			</label>
		                            		</div>
		                            		<div>
		                            			<button onClick={ this.handleCrop } className="btn btn-success btn-block">Crop</button>
		                            		</div>
		                            		<div className="row">
		                            			<div className="col-sm-6" style={{overflow:"auto"}}>
		                            				<iframe ref={ (ref) => this.outputFrame = ref } src={ this.state.cropped } alt=""/>
		                            				<canvas ref={ (ref) => this.myCanvas = ref } />
		                            			</div>
		                            			<div className="col-sm-6" style={{overflow:"auto"}}>
		                            				<img src={ this.state.cropped } alt=""/>	
		                            				{/*<iframe src={ this.state.cropped } alt=""/>	*/}
		                            			</div>
		                            		</div>
                                		</div>
                                	</div>

                                </div>
                                <div className="modal-footer">
                                    {
                                    //<button 
                                    //    className="btn btn-primary"
                                    //    onClick={ this.handleUpload }>Proceed</button>
                                    //{ ' ' }
                                    //<button 
                                    //    className="btn btn-default"
                                    //    onClick={ this.handleShowInstruction(false) }>Cancel</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show" style={{zIndex: 1050, pointerEvents: "initial"}}/>
                </div>
			</div>
		)
	}
}