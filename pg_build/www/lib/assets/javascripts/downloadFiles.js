   function downloadFile(path_to_download,file_name){
        window.requestFileSystem(
                     LocalFileSystem.PERSISTENT, 0, 
                     function onFileSystemSuccess(fileSystem) {
                     fileSystem.root.getFile(
                                 "dummy.html", {create: true, exclusive: false}, 
                                 function gotFileEntry(fileEntry){
                                 var sPath = fileEntry.fullPath.replace("dummy.html","");
                                 localStorage["local_file_system_path"] = sPath;
                                 var fileTransfer = new FileTransfer();
                                 fileEntry.remove();
 
                                 fileTransfer.download(
                                           path_to_download,
                                           sPath + file_name,
                                           function(theFile) {
                                           console.log("download complete: " + theFile.toURI());
                                           showLink(theFile.toURI());
                                           },
                                           function(error) {
                                           console.log("download error source " + error.source);
                                           console.log("download error target " + error.target);
                                           console.log("upload error code: " + error.code);
                                           }
                                           );
                                 }, 
                                 fail);
                     }, 
                     fail);
 
    }
 
    function showLink(url){
        alert(url);
        var divEl = document.getElementById("ready");
        var aElem = document.createElement("a");
        aElem.setAttribute("target", "_blank");
        aElem.setAttribute("href", url);
        aElem.appendChild(document.createTextNode("Ready! Click To Open."))
        divEl.appendChild(aElem);
 
    }

    function addManifest(filename){


      if(localStorage["file_manifest"] != undefined)
      {

        var manifest_array = localStorage["file_manifest"].split(",");
        manifest_array.push(filename);
        localStorage["file_manifest"] = manifest_array;

      }
        else {

        localStorage["file_manifest"] = [filename];


        }

    }

 
 
    function fail(evt) {
        console.log(evt.target.error.code);
    }