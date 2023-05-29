class desc{
    description;
    icon;
    link;
    constructor(desc, icon, link){
        this.description = desc
        this.icon = icon
        this.link = link
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
    getLink(){
        return this.link
    }
}
export default desc;