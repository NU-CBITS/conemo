  var getPurpleRobotConfigAndStartApp = function (){

         var json = {};
        json.command = "execute_script";
        json.script = PurpleRobotClient.launchRequest; 
        var post_data = {};
        post_data.json = JSON.stringify(json);

         $.ajax(PurpleRobotClient.serverUrl, {
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: post_data,
        success: function (data) {
            // alert("Trigger created. It will launch shortly after " + fire_date + "...");
            //            alert("GOT DATA: " + JSON.stringify(data));
            console.log("SUCCESS | Purple Robot Transmission [PurpleRobotClient.postJSON()]: ", data);
            localStorage["app_config"] = data.payload;
            localStorage["page_to_load"] = data.payload.page_to_load;
            app.start();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert("Error - Transmission to Purple Robot: " + textStatus + " --- " + errorThrown);
        

            alert("ERROR | Purple Robot Transmission [PurpleRobotClient.postJSON()]: " + textStatus + " --- " + errorThrown);

          

        }
    });
    }


    function onCordovaLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    // device APIs are available
    //
    function onDeviceReady() {
        document.addEventListener("resume", onResume, false);
        getPurpleRobotConfigAndStartApp();

    }

    // Handle the resume event
    function onResume() {
    getPurpleRobotConfigAndStartApp();
    }