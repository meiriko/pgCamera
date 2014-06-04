/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

	uploadFile: function(fileURL){
		alert('uploading');
		// !! Assumes variable fileURL contains a valid URL to a text file on the device,
		//    for example, cdvfile://localhost/persistent/path/to/file.txt

		var win = function (r) {
			alert("Code = " + r.responseCode);
			alert("Response = " + r.response);
			alert("Sent = " + r.bytesSent);
		}

		var fail = function (error) {
			alert("An error has occurred: Code = " + error.code);
			alert("upload error source " + error.source);
			alert("upload error target " + error.target);
		}

		var options = new FileUploadOptions();
		// options.fileKey = "file";
		// options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
		options.mimeType = "video/mp4";

		var params = {};
		params.value1 = "test";
		params.value2 = "param";

		options.params = params;
var x = new FileTransfer();

alert('ready?');
var xhr = new XMLHttpRequest();
alert('p1');
var fd = new FormData();
fd.append('video-meir.mp4','meir.mp4');
//fd.append('video-meir1.mp4',
alert('p2');
xhr.open('POST', "http://192.168.2.106:3000/upload", true);
alert('p3');
/*
		var ft = new FileTransfer();
alert('ssssteady?');
		ft.upload(fileURL, encodeURI("http://192.168.2.106:8080/upload"), win, fail, options);
alert('go?');
*/
	},

	initCapture: function(){
		// capture callback
		var captureSuccess = function(mediaFiles) {
			var i, path, len;
			alert('got ' + mediaFiles.length);
			for (i = 0, len = mediaFiles.length; i < len; i += 1) {
				path = mediaFiles[i].fullPath;
alert(Object.keys(mediaFiles[i]));
				app.uploadFile(path);
				//alert(toInternalURL(path));
				// alert(path);
				// alert(mediaFiles[i] instanceof String);
				// alert(mediaFiles[i] instanceof FileEntry);
				// var fs = new FileSystem('m','/');
				// var fe = new FileEntry('xxx',path,fs);
				/*
				fe.fullPath = path;
				alert(fe.toURL());
				*/
				// alert(FileSystem);
				// alert(fe.fullPath);
				// alert(fe.getMetadata());
				/*
				alert(fe.toURL());
				fs.getFile(
					path,
					{},
					function(fent){alert('good!');alert(fent);alert('x: ' + (fent instanceof FileEntry));},
					function(err){alert('failed: ' + err.code);}
				);
				*/
				// alert(new FileEntry(path).toURL());
				// alert(Object.keys(mediaFiles[i]));
				/*
				mediaFiles[i].getFormatData(function(info){
					var s = info.codecs + ' , ' + info.width + 'x ' + info.height + ' , ' + info.bitrate + ' , ' + info.duration;
					navigator.notification.alert(s, null, 'media result');
				});
				*/
				// do something interesting with the file
			}
		};

		// capture error callback
		var captureError = function(error) {
			alert('cap err');
			navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
		};

		// start video capture
		document.querySelector("#capture").addEventListener('click', function(event){
			// navigator.notification.alert('cappp', null, 'media result', 'gooo');
			navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});
			// alert(navigator.device.capture.supportedVideoModes);
			// alert(navigator.device.capture.supportedAudioModes);
			// alert(navigator.device.capture.supportedImageModes.length);
		});
	},
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
		function onBatteryStatus(info) {
		    // Handle the online event
			// console.log("Level: " + info.level + " isPlugged: " + info.isPlugged);
			alert(info.level);
		}
		function createEventHandler(eventName,handler){
			document.addEventListener(eventName, function(event){
				app.receivedEvent(event.type);
				if(handler){
					handler(event);
				}
			}, false );
		}
		createEventHandler('deviceready',function(event){
			window.addEventListener("batterystatus", function(e){ alert('but stat: ' + e.level);}, true);
			function onSuccess(acceleration) {
				alert('Acceleration X: ' + acceleration.x + '\n' +
					  'Acceleration Y: ' + acceleration.y + '\n' +
					  'Acceleration Z: ' + acceleration.z + '\n' +
					  'Timestamp: '      + acceleration.timestamp + '\n');
			};

			function onError() {
				alert('onError!');
			};

			document.querySelector("#accel").addEventListener('click', function(event){
				// navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
alert('pre');
alert(FileTransferError);
alert('pre1');
alert(new FileTransferError());
alert('pre3');
				var x = new FileTransfer();
alert('pos1t');
			});
			// window.addEventListener("batterystatus", onBatteryStatus, false);
			app.initCapture();
		});
		createEventHandler('offline');
		createEventHandler('online');
		// createEventHandler('resume',function(e){alert('resume');}, false);
		// createEventHandler('menubutton',function(e){alert('menu!');}, false);
        // document.addEventListener('deviceready', this.onDeviceReady, false);
		//window.addEventListener("batterystatus", onBatteryStatus, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		setTimeout(function(){
			var parentElement = document.getElementById(id);
			var listeningElement = parentElement.querySelector('.listening');
			var receivedElement = parentElement.querySelector('.received');

			if(listeningElement){
				listeningElement.setAttribute('style', 'display:none;');
			}
			if(receivedElement){
				receivedElement.setAttribute('style', 'display:block;');
			}

			console.log('Received Event: ' + id);
		},10);
    }
};
