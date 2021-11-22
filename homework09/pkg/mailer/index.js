const config = require('../config');
const fs = require('fs');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

let cfgMailer = config.get('mailer');

const mailTemplates = {
    WELCOME: {
        title: 'Welcome to THE Website!',
        template: 'welcome.html'
    }
};

const sendMail = async (to, type, data) => {
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client(
        {
            username: 'api',
            key: cfgMailer.key
        });
    let title = '';
    let content = '';
    if (mailTemplates[type]) {
        title = mailTemplates[type].title;
        let templatePath = `${__dirname}/../../email_templates/${mailTemplates[type].template}`;
        content = await getTemplate(templatePath);
        for (let i in data) {
            let regex = new RegExp(`\{\{${i}\}\}`, 'g');
            content = content.replace(regex, data[i]);
        }
    }
    const options = {
        from: cfgMailer.default_address,
        to: to,
        subject: title,
        html: content
    };
    try {
        let res = await mg.messages.create(cfgMailer.domain, options);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};

const getTemplate = (path) => {
    return new Promise((success, fail) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        });
    });
};

module.exports = {
    sendMail
}