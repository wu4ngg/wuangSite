class desc{
    description;
    icon;
    constructor(desc, icon){
        this.description = desc
        this.icon = icon
    }
    getDescription() {
        return this.description
    }
    getIcon() {
        console.log(this.icon);
        return this.icon
    }
    setDescription(desc){
        this.description = desc
    }
    setIcon(icon){
        this.icon = icon;
    }
}
export default desc;