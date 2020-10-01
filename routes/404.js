module.exports = (app)=>{
    app.get("/*", (req, res)=>{
        res.status(404).json({
            errorMessage : "resource introuvable!"
        })
    })
    app.post("/*", (req, res)=>{
        res.status(404).json({
            errorMessage : "resource introuvable!"
        })
    })
}