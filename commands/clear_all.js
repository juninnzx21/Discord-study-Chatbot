const { SlashCommandBuilder } = require("discord.js");

// ID do cargo do Conselho SAER
const CONSELHO_SAER_ID = '1248073011802931204';

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Limpa todo o canal"),

    async execute(interaction) {
        try {
            // Defere a resposta para evitar timeout
            await interaction.deferReply({ ephemeral: true });

            // Verifica se o autor do comando possui o cargo de Conselho SAER
            const membro = interaction.member;
            const temPermissao = membro.roles.cache.has(CONSELHO_SAER_ID);

            if (!temPermissao) {
                await interaction.editReply({ content: "Você não tem permissão para executar esse comando." });
                return;
            }

            const deletedMessagesCount = await clearAllMessages(interaction.channel);
            console.log(`Foram excluídas ${deletedMessagesCount} mensagens.`);
            await interaction.editReply({ content: `Foram excluídas ${deletedMessagesCount} mensagens.` });
        } catch (error) {
            console.error('Ocorreu um erro ao limpar as mensagens:', error);
            await interaction.editReply({ content: "Ocorreu um erro ao limpar as mensagens." });
        }
    }
};

async function clearAllMessages(channel) {
    let totalDeleted = 0;
    let fetched;
    do {
        fetched = await channel.messages.fetch({ limit: 100 });
        if (fetched.size > 0) {
            const deleted = await channel.bulkDelete(fetched, true); // "true" é para limpar mensagens antigas
            totalDeleted += deleted.size;
        }
    } while (fetched.size > 0);
    return totalDeleted;
}
