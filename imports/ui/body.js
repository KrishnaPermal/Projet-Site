import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import './task.js';
import './body.html';
import './template.js';
import './cards.js';
import './footer.js';
import './caroussel.js';
import './collapse.js';
import './scroll.js';
import './liste.js';




// Définit le helpers sites()

Template.body.helpers({

    tasks() {
    
        // Show newest tasks at the top
    
        return Tasks.find({}, { sort: { createdAt: -1 } });
    
    },
    });
    
    
    Template.body.events({
        'submit .new-task'(event) {
    
        // Prevent default browser form submit
        event.preventDefault();
    
        // Get value from form element
        const target = event.target;
        const text = target.nom.value;
        const desc = target.desc.value;
        const lien = target.lien.value;
    
        // Insert a task into the collection
        Tasks.insert({
            text,
            desc,
            lien,
            createdAt: new Date(), // current time
        });
    
        // Clear form
        target.text.value = '';
        target.desc.value = '';
        target.lien.value = '';
    },

    // Pour le formulaire du modal
    'submit .modif'(event) {

        event.preventDefault();

    // Variables qui permettent de récupèrer les valeurs des inputs du modal
        const target = event.target;
        const text2 = target.modif1.value;
        const desc2 = target.modif2.value;
        const lien2 = target.modif3.value;
        const id = target.editId.value;

    // Permet de remplacer les inputs de la collection par les inputs du modal
        Tasks.update(id,{
            $set: {text:text2,desc:desc2,lien:lien2}
        })
    }
    
    });

    Template.collection.events({
        'click .delete'(){
    
            Tasks.remove(this._id);
        
        },
        
        'click .btn-edit-membre'(event){

            //Recupère l'identité du bouton modifier
            const target = event.target;
            const idMembre = target.getAttribute('data-id');
            const membre = Tasks.findOne({_id:idMembre});

            //Recupère les IDs des inputs du modal
            const form1 = document.querySelector('#title');
            const form2 = document.querySelector('#describe');
            const form3 = document.querySelector('#url');
            const hidden = document.querySelector('#edit-Id');

            hidden.value = idMembre;

            form1.value = membre.text;
            form2.value = membre.desc;
            form3.value = membre.url;
        }

        

        });