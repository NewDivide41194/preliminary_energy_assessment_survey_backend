const deleteFiles=()=>{
    const DIR = 'public/uploads';
    
    //   message : "Error! in image upload.";
    //     if (!req.params.imagename) {
    //         console.log("No file received");
    //         message = "Error! in image delete.";
    //         return res.status(500).json('error in delete');
        
    //       } else {
    //         console.log('file received');
    //         console.log(req.params.imagename);
    //         try {
    //             fs.unlinkSync(DIR+'/'+req.params.imagename+'.png');
    //             console.log('successfully deleted /tmp/hello');
    //             return res.status(200).send('Successfully! Image has been Deleted');
    //           } catch (err) {
    //             // handle the error
    //             return res.status(400).send(err);
    //           }
            
          
    
    // };
}

modules.export={deleteFiles}