const { SlashCommandBuilder } = require("discord.js");

let isExecuting = false;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("att-hierarquia")
        .setDescription("Atualiza Hierarquia SAER"),

    async execute(interaction) {
        // Verifica se o comando já está em execução
        if (isExecuting) {
            await interaction.reply({ content: "O comando já está em execução. Por favor, aguarde a finalização.", ephemeral: true });
            return;
        }

        isExecuting = true;

        // Envia uma resposta inicial
        await interaction.reply({ content: "Atualizando a hierarquia, por favor, aguarde...", ephemeral: true });

        try {
            const mensagem = await AtualizarSaer(interaction.channel);
            await interaction.followUp({ content: "Hierarquia atualizada com sucesso.", ephemeral: true });
            await interaction.channel.send(mensagem);
        } catch (error) {
            console.error(error);
            await interaction.followUp({ content: "Ocorreu um erro ao atualizar a hierarquia.", ephemeral: true });
        } finally {
            isExecuting = false;
        }
    }
};

async function AtualizarSaer(canal) {
    try {
        await canal.bulkDelete(38, true);
    } catch (error) {
        console.error("Erro ao deletar mensagens:", error);
    }

    let mensagem = '';

    mensagem += `\`👮『 COMANDO GERAL 』- ${canal.guild.members.cache.filter(x => x.roles.cache.has('1248073011857326088')).size}\`\n`;
    const roleEquipe = canal.guild.roles.cache.find(role => role.id == "1248073011857326088");
    const membrosRole = roleEquipe.members.filter(member => member.roles.cache.some(role => role.id == "1248073011857326088")).map(x => `<@${x.id}>`).join("\n➤ ");
    mensagem += "➤  " + membrosRole + '\n\n';

    mensagem += `\`👮『 SUB COMANDO GERAL 』- ${canal.guild.members.cache.filter(x => x.roles.cache.has('1248073011857326087')).size}\`\n`;
    const roleEquipe2 = canal.guild.roles.cache.find(role => role.id == "1248073011857326087");
    const membrosRole2 = roleEquipe2.members.filter(member => member.roles.cache.some(role => role.id == "1248073011857326087")).map(x => `<@${x.id}>`).join("\n➤ ");
    mensagem += "➤  " + membrosRole2 + '\n\n';

    mensagem += `\`👮『 Delegado PCERJ 』- ${canal.guild.members.cache.filter(x => x.roles.cache.has('1248073011857326086')).size}\`\n`;
    const roleEquipe3 = canal.guild.roles.cache.find(role => role.id == "1248073011857326086");
    const membrosRole3 = roleEquipe3.members.filter(member => member.roles.cache.some(role => role.id == "1248073011857326086")).map(x => `<@${x.id}>`).join("\n➤ ");
    mensagem += "➤  " + membrosRole3 + '\n\n';

    mensagem += `\`👮『 COMANDO SAER 』- ${canal.guild.members.cache.filter(x => x.roles.cache.has('1248073011857326085')).size}\`\n`;
    const roleEquipe4 = canal.guild.roles.cache.find(role => role.id == "1248073011857326085");
    const membrosRole4 = roleEquipe4.members.filter(member => member.roles.cache.some(role => role.id == "1248073011857326085")).map(x => `<@${x.id}>`).join("\n➤ ");
    mensagem += "➤  " + membrosRole4 + '\n\n';

    mensagem += `\`👮『 SUBCOMANDO SAER 』- ${canal.guild.members.cache.filter(x => x.roles.cache.has('1248073011857326084')).size}\`\n`;
    const roleEquipe5 = canal.guild.roles.cache.find(role => role.id == "1248073011857326084");
    const membrosRole5 = roleEquipe5.members.filter(member => member.roles.cache.some(role => role.id == "1248073011857326084")).map(x => `<@${x.id}>`).join("\n➤ ");
    mensagem += "➤  " + membrosRole5 + '\n\n';

    mensagem += `\`👮『 CAPITÃO SAER 』- ${canal.guild.members.cache.filter(x => x.roles.cache.has('1248073011857326083')).size}\`\n`;
    const roleEquipe6 = canal.guild.roles.cache.find(role => role.id == "1248073011857326083");
    const membrosRole6 = roleEquipe6.members.filter(member => member.roles.cache.some(role => role.id == "1248073011857326083")).map(x => `<@${x.id}>`).join("\n➤ ");
    mensagem += "➤  " + membrosRole6 + '\n\n';

    mensagem += `\`👮『 INSTRUTOR PILOTO SAER 』- ${canal.guild.members.cache.filter(x => x.roles.cache.has('1248073011844612106')).size}\`\n`;
    const roleEquipe7 = canal.guild.roles.cache.find(role => role.id == "1248073011844612106");
    const membrosRole7 = roleEquipe7.members.filter(member => member.roles.cache.some(role => role.id == "1248073011844612106")).map(x => `<@${x.id}>`).join("\n➤ ");
    mensagem += "➤  " + membrosRole7 + '\n\n';

    mensagem += `\`👮『 INSTRUTOR SAER 』- ${canal.guild.members.cache.filter(x => x.roles.cache.has('1248073011844612105')).size}\`\n`;
    const roleEquipe8 = canal.guild.roles.cache.find(role => role.id == "1248073011844612105");
    const membrosRole8 = roleEquipe8.members.filter(member => member.roles.cache.some(role => role.id == "1248073011844612105")).map(x => `<@${x.id}>`).join("\n➤ ");
    mensagem += "➤  " + membrosRole8 + '\n\n';

    mensagem += `\`👮『 ELITE SAER 』- ${canal.guild.members.cache.filter(x => x.roles.cache.has('1248073011832291390')).size}\`\n`;
    const roleEquipe9 = canal.guild.roles.cache.find(role => role.id == "1248073011832291390");
    const membrosRole9 = roleEquipe9.members.filter(member => member.roles.cache.some(role => role.id == "1248073011832291390")).map(x => `<@${x.id}>`).join("\n➤ ");
    mensagem += "➤  " + membrosRole9 + '\n\n';

    mensagem += `\`👮『 PILOTO SAER 』- ${canal.guild.members.cache.filter(x => x.roles.cache.has('1248073011832291391')).size}\`\n`;
    const roleEquipe10 = canal.guild.roles.cache.find(role => role.id == "1248073011832291391");
    const membrosRole10 = roleEquipe10.members.filter(member => member.roles.cache.some(role => role.id == "1248073011832291391")).map(x => `<@${x.id}>`).join("\n➤ ");
    mensagem += "➤  " + membrosRole10 + '\n\n';

    mensagem += `\`👮『 ATIRADOR SAER 』- ${canal.guild.members.cache.filter(x => x.roles.cache.has('1248073011832291392')).size}\`\n`;
    const roleEquipe11 = canal.guild.roles.cache.find(role => role.id == "1248073011832291392");
    const membrosRole11 = roleEquipe11.members.filter(member => member.roles.cache.some(role => role.id == "1248073011832291392")).map(x => `<@${x.id}>`).join("\n➤ ");
    mensagem += "➤  " + membrosRole11 + '\n\n';

    mensagem += `\`👮『 PQD SAER 』- ${canal.guild.members.cache.filter(x => x.roles.cache.has('1248073011832291393')).size}\`\n`;
    const roleEquipe12 = canal.guild.roles.cache.find(role => role.id == "1248073011832291393");
    const membrosRole12 = roleEquipe12.members.filter(member => member.roles.cache.some(role => role.id == "1248073011832291393")).map(x => `<@${x.id}>`).join("\n➤ ");
    mensagem += "➤  " + membrosRole12 + '\n\n';

    mensagem += `**✪ ❱ Hierarquia atualizada nos dados de: ${new Date().toLocaleDateString()} \n✪ ❱ Total de membros: ${canal.guild.members.cache.filter(x => x.roles.cache.has('1248073011832291394')).size}**`;

    return mensagem;
}
