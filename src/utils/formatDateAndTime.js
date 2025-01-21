const formatDateAndTime = (data=Date.now())=>{
    const newDate = new Date(data);
    const formattedTime = newDate.toLocaleTimeString( "en-US",{
        hour:"numeric",
        minute:"numeric"
    });
    const formattedDate = newDate.toLocaleDateString("en-us",{
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

