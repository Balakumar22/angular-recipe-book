"use strict";(self.webpackChunkproject1=self.webpackChunkproject1||[]).push([[320],{3320:(Z,d,r)=>{r.r(d),r.d(d,{ShoppingListModule:()=>b});var t=r(8256),c=r(5242),g=r(6895),m=r(9985),p=r(433);const l=["form"];function u(e,s){if(1&e){const n=t.EpF();t.TgZ(0,"button",14),t.NdJ("click",function(){t.CHM(n);const o=t.oxw();return t.KtG(o.onDelete())}),t._uU(1," Delete "),t.qZA()}}let a=(()=>{class e{constructor(n){this.shoppingService=n,this.editMode=!1}ngOnInit(){this.shoppingService.ingredientToEdit.subscribe(n=>{this.editMode=!0,this.editItemIndex=n,this.editItem=this.shoppingService.getIngredient(n),this.form.setValue({name:this.editItem.name,amount:this.editItem.amount})})}onAddIngredient(){const o=new m.o(this.form.value.name,this.form.value.amount);this.editMode?this.shoppingService.UpdateIngredient(this.editItemIndex,o):this.shoppingService.AddIngredient(o),this.onClear()}onDelete(){this.shoppingService.DeleteIngredient(this.editItemIndex),this.onClear()}onClear(){this.editMode=!1,this.form.reset()}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(c.s))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-shopping-edit"]],viewQuery:function(n,i){if(1&n&&t.Gf(l,5),2&n){let o;t.iGM(o=t.CRH())&&(i.form=o.first)}},decls:21,vars:3,consts:[[1,"row"],[1,"col-sm-12"],[3,"ngSubmit"],["form","ngForm"],[1,"col-sm-5","form-group"],["for","name"],["id","name","name","name","type","text","ngModel","","required","",1,"form-control"],[1,"col-sm-2","form-group"],["for","amount"],["id","amount","name","amount","type","number","ngModel","","required","","pattern","^[1-9]+[0-9]*$",1,"form-control"],[1,"action-btn-container"],["type","button","type","submit",1,"btn","btn-success",3,"disabled"],["type","button","class","btn btn-danger",3,"click",4,"ngIf"],["type","button",1,"btn","btn-primary",3,"click"],["type","button",1,"btn","btn-danger",3,"click"]],template:function(n,i){if(1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"form",2,3),t.NdJ("ngSubmit",function(){return i.onAddIngredient()}),t.TgZ(4,"div",0)(5,"div",4)(6,"label",5),t._uU(7,"Name"),t.qZA(),t._UZ(8,"input",6),t.qZA(),t.TgZ(9,"div",7)(10,"label",8),t._uU(11,"Amount"),t.qZA(),t._UZ(12,"input",9),t.qZA()(),t.TgZ(13,"div",0)(14,"div",1)(15,"div",10)(16,"button",11),t._uU(17),t.qZA(),t.YNc(18,u,2,0,"button",12),t.TgZ(19,"button",13),t.NdJ("click",function(){return i.onClear()}),t._uU(20," Clear "),t.qZA()()()()()()()),2&n){const o=t.MAs(3);t.xp6(16),t.Q6J("disabled",!o.valid),t.xp6(1),t.hij(" ",i.editMode?"Update":"Add"," "),t.xp6(1),t.Q6J("ngIf",i.editMode)}},dependencies:[p._Y,p.Fj,p.wV,p.JJ,p.JL,p.Q7,p.c5,p.On,p.F,g.O5],styles:[".action-btn-container[_ngcontent-%COMP%]{display:flex;align-items:center;gap:15px}"]}),e})();function h(e,s){if(1&e){const n=t.EpF();t.TgZ(0,"a",4),t.NdJ("click",function(){const C=t.CHM(n).index,I=t.oxw();return t.KtG(I.onEditIngredient(C))}),t._uU(1),t.qZA()}if(2&e){const n=s.$implicit;t.xp6(1),t.AsE(" ",n.name," (",n.amount,") ")}}let f=(()=>{class e{constructor(n){this.shoppingService=n}ngOnInit(){this.ingredients=this.shoppingService.getIngredients(),this.ingredientChangeSub=this.shoppingService.ingredientsChanged.subscribe(n=>{this.ingredients=n})}onEditIngredient(n){this.shoppingService.ingredientToEdit.next(n)}ngOnDestroy(){this.ingredientChangeSub.unsubscribe()}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(c.s))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-shopping-list"]],decls:6,vars:1,consts:[[1,"row"],[1,"col-xs-10"],[1,"list-group"],["class","list-group-item","style","cursor: pointer",3,"click",4,"ngFor","ngForOf"],[1,"list-group-item",2,"cursor","pointer",3,"click"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0)(1,"div",1),t._UZ(2,"app-shopping-edit")(3,"hr"),t.TgZ(4,"ul",2),t.YNc(5,h,2,2,"a",3),t.qZA()()()),2&n&&(t.xp6(5),t.Q6J("ngForOf",i.ingredients))},dependencies:[g.sg,a]}),e})();var S=r(1196),v=r(4466);let b=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[p.u5,S.Bz.forChild([{path:"",component:f}]),v.m]}),e})()}}]);