var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
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
        
        var playerObj = null;
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
      
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccessUpload, fail);

        function onFileSystemSuccessUpload(fileSystem) {
            
            fileSystem.root.getDirectory('/storage/sdcard0/qqmusic/song', {}, function(dirEntry){
                alert('find qq music ');//return;
                // get directory entry through root and access all the folders
                var directoryReader = dirEntry.createReader();
                
                // Get a list of all the entries in the directory
                directoryReader.readEntries(successReader,fail); 
            }, function(){
                alert('cannot find the directory /storage/sdcard0/qqmusic/song')
            });
            
        }
          
        function myinsert(entry) {
            var li = document.createElement('li');
            li.innerHTML = ['<span>', entry.fullPath, '</span>'].join('');
            document.querySelector('#filelist').appendChild(li);
        }

        function successReader(entries) {
            var i;
            for (i=0; i<entries.length; i++) {
                //alert(entries[i].name);
                if(entries[i].isDirectory==true) {
                //var directoryReaderIn = entries[i].createReader();
                //directoryReaderIn.readEntries(successReader,fail); 
                }
                myinsert(entries[i]);
                //listResults(entries[i]);
                if(entries[i].isFile==true) {
                    //alert('i:'+entries[i].fullPath);
                    //entries[i].file(uploadFile, fail);
                }
            }
            
            var lis = document.querySelectorAll('li');
            
            for (var i = 0; i < lis.length; i++) {
                var li = lis[i];
                li.onclick=(function(index){
                    return function(){
                        playerObj && playerObj.stop();
                        playerObj && playerObj.release();
                        playerObj = new Media('file:///storage/sdcard0' + lis[index].innerText, function(){
                            alert('ok');
                        }, function(){
                            alert('bad');
                        });
                        playerObj.play();
                    };
                    
                })(i);
            }
        }; 

        function uploadFile(file) {
            var target=""; //the url to upload on server
            var ft = new FileTransfer(),path = "file://"+ file.fullPath,name = file.name;
            ft.upload(path, target, win, fail, { fileName: name });
            // var ft = new FileTransfer();
            //ft.upload(file.fullPath, target, win, fail, options);
            
            
            function win(r) {
            alert("Code = " + r.responseCode);
            alert("Response = " + r.response);
            alert("Sent = " + r.bytesSent);
            }
            
            function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            }
        }
        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
        }
      
    }
};
