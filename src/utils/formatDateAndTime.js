const formatDateAndTime = (data=Date.now())=>{
    const newDate = new Date(data);
    const formattedDate = newDate.toLocaleDateString( "en-US",{
        hour:"numeric",
        minute:"numeric",
        second:"numeric"
    });
    const formattedTime = newDate.toLocaleDateString("en-us",{
        month:"long",
        day:"numeric",
        year:"numeric",
    });
    return {
        date: formattedDate,
        time:formattedTime,
    };
};

export default formatDateAndTime;

