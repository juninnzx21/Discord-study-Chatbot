const { Client, Intents, SlashCommandBuilder } = require('discord.js');

let isExecuting = false;

const client = new Client ({
    intents: [
        "Guilds", "GuildMembers", "GuildMessages"
    ],
}) 


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

            const {guild} = interaction.member
            

            const messages = await AtualizarSaer(guild);
            await interaction.followUp({ content: "Hierarquia atualizada com sucesso.", ephemeral: true });
            for (const msg of messages) {
                await interaction.channel.send(msg);
            }
        } catch (error) {
            console.error(error);
            await interaction.followUp({ content: "Ocorreu um erro ao atualizar a hierarquia.", ephemeral: true });
        } finally {
            isExecuting = false;
        }
    }
};

async function AtualizarSaer(canal) {

    console.log(canal.id)
    const guild = client.guilds.cache.get(canal.id);
    console.log(guild)

    //  canal.roles.cache.forEach(role => {
    //    console.log(role.name)
    //});
    
    //await canal.bulkDelete(38);

    const roles = [
        { id: '1248073011857326088', name: 'COMANDO GERAL' },
        { id: '1248073011857326087', name: 'SUB COMANDO GERAL' },
        { id: '1248073011857326086', name: 'DELEGADO PECERJ' },
        { id: '1248073011857326085', name: 'COMANDO SAER' },
        { id: '1248073011857326084', name: 'SUBCOMANDO SAER' },
        { id: '1248073011857326083', name: 'CAPITÃO SAER' },
        { id: '1248073011844612106', name: 'INSTRUTOR PILOTO SAER' },
        { id: '1248073011844612105', name: 'INSTRUTOR SAER' },
        { id: '1248073011832291390', name: 'ELITE SAER' },
        { id: '1248073011832291391', name: 'PILOTO SAER' },
        { id: '1248073011832291392', name: 'ATIRADOR SAER' },
        { id: '1248073011832291393', name: 'PQD SAER' }
    ];               

    roles.forEach((role) => {
       const now_role_map =  guild.roles.cache.get(role.id)
       const membersWithRole = guild.members.cache.filter(member => member.roles.cache.has(now_role_map.id));
       
       console.log(membersWithRole)
    })

    let messages = [];

    // for (const role of roles) {
        
    //     const roleObject = canal.guild.roles.cache.find(r => r.id === role.id);
    //     const members = roleObject.members.map(member => `<@${member.id}>`).join("\n>> ");
        
        

    //     messages.push({ content: `\`-『 ${role.name} 』- ${roleObject.members.size}\` ` });
    //     if (members) {
    //         messages.push(">> " + members);
    //     }
    // }

    messages.push(`**✪ ❱ Hierarquia Atualizada na data de: ${new Date().toLocaleDateString()} \n✪ ❱ Total Membros: ${canal.guild.members.cache.filter(x => x.roles.cache.has('1075201814770757642')).size}**`);

    return messages;
}
