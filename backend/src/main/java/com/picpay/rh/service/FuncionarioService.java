package com.picpay.rh.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;

import com.picpay.rh.model.Funcionario;

@Service
public class FuncionarioService {
    private final List<Funcionario> funcionarios = new ArrayList<>();
    private final AtomicLong proximoId = new AtomicLong(1);

    public FuncionarioService() {
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Adriel Pimentel", "adriel.pimentel@picpay.com",
                "11979678570", "CTO", "Transformação Digital", 50000.0, "São Paulo", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Pedro Sena", "pedro.sena@picpay.com",
                "11246976924", "CEO", "Transformação Digital", 350000.0, "São Paulo", "APROVADO"));
                        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Igor Duarte", "igor.duarte@picpay.com",
                "85919600133", "Zelador", "Limpeza e Zelo", 1840.81, "Belo Horizonte-MG", "REPROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Daniel Teixeira", "daniel.teixeira@picpay.com",
                "81994026542", "Jardineiro", "Limpeza e Zelo", 1757.91, "Joinville-SC", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Amanda Yamamoto", "amanda.yamamoto@picpay.com",
                "61994078161", "Analista Financeiro", "Financeiro", 3838.75, "Niteroi-RJ", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Leticia Junqueira", "leticia.junqueira@picpay.com",
                "41941316475", "SDR", "Comercial", 11322.16, "Rio de Janeiro-RJ", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Diego Lacerda", "diego.lacerda@picpay.com",
                "31983276483", "Contador", "Financeiro", 10305.96, "Rio de Janeiro-RJ", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Isabela Klein", "isabela.klein@picpay.com",
                "21939537672", "Auxiliar de Limpeza", "Limpeza e Zelo", 2879.24, "Salvador-BA", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Gustavo Esteves", "gustavo.esteves@picpay.com",
                "71953287101", "QA Engineer", "Transformação Digital", 17572.74, "Fortaleza-CE", "REPROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Fernanda Uchoa", "fernanda.uchoa@picpay.com",
                "81984801845", "UX Designer", "Transformação Digital", 14937.16, "Recife-PE", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Larissa Junqueira", "larissa.junqueira@picpay.com",
                "31981489325", "Recrutador", "Recursos Humanos", 6810.38, "Porto Alegre-RS", "CONTRATADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Otavio Farias", "otavio.farias@picpay.com",
                "11915430391", "Analista Comercial", "Comercial", 16712.2, "Manaus-AM", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Camila Xavier", "camila.xavier@picpay.com",
                "31978248963", "Analista de RH", "Recursos Humanos", 11790.85, "Joinville-SC", "REPROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Rosana Ramalho", "rosana.ramalho@picpay.com",
                "85971331509", "QA Engineer", "Transformação Digital", 11482.37, "Feira de Santana-BA", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Leticia Henriques", "leticia.henriques@picpay.com",
                "11951834738", "Gerente Comercial", "Comercial", 2313.62, "Campinas-SP", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Bruno Xavier", "bruno.xavier@picpay.com",
                "41911656670", "Analista Comercial", "Comercial", 9668.2, "Goiania-GO", "REPROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Isabela Uchoa", "isabela.uchoa@picpay.com",
                "21933387262", "Faxineiro", "Limpeza e Zelo", 2124.72, "Salvador-BA", "REPROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Vanessa Oliveira", "vanessa.oliveira@picpay.com",
                "85901326773", "Desenvolvedor Frontend", "Transformação Digital", 12254.79, "Joinville-SC", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Elaine Machado", "elaine.machado@picpay.com",
                "81946872343", "Auxiliar de Limpeza", "Limpeza e Zelo", 2082.15, "Recife-PE", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Beatriz Siqueira", "beatriz.siqueira@picpay.com",
                "81988208121", "Executivo de Vendas", "Comercial", 14018.01, "Campinas-SP", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Paulo Cardoso", "paulo.cardoso@picpay.com",
                "27909169985", "UX Designer", "Transformação Digital", 6598.02, "Vitoria-ES", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Rosana Ibrahim", "rosana.ibrahim@picpay.com",
                "51975107991", "DevOps", "Transformação Digital", 8677.0, "Recife-PE", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Rafael Ramalho", "rafael.ramalho@picpay.com",
                "41954278498", "QA Engineer", "Transformação Digital", 6817.99, "Feira de Santana-BA", "REPROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Lucas Vasconcelos", "lucas.vasconcelos@picpay.com",
                "31941182449", "SDR", "Comercial", 16921.75, "Niteroi-RJ", "CONTRATADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Amanda Wanderley", "amanda.wanderley@picpay.com",
                "51901640052", "Contador", "Financeiro", 10499.97, "Porto Alegre-RS", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Igor Ibrahim", "igor.ibrahim@picpay.com",
                "21912805982", "Cientista de Dados", "Transformação Digital", 14154.41, "Fortaleza-CE", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Tatiane Esteves", "tatiane.esteves@picpay.com",
                "41931586923", "Zelador", "Limpeza e Zelo", 2056.37, "Campinas-SP", "REPROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Elaine Farias", "elaine.farias@picpay.com",
                "71934216073", "UX Designer", "Transformação Digital", 4933.76, "Salvador-BA", "REPROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Felipe Andrade", "felipe.andrade@picpay.com",
                "41965414586", "Business Partner", "Recursos Humanos", 5399.31, "Londrina-PR", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Isabela Andrade", "isabela.andrade@picpay.com",
                "51929401965", "SDR", "Comercial", 17039.95, "Niteroi-RJ", "REPROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Julio Zanetti", "julio.zanetti@picpay.com",
                "27934060883", "Assistente Financeiro", "Financeiro", 9589.54, "Florianopolis-SC", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Aline Nogueira", "aline.nogueira@picpay.com",
                "51984656482", "Zelador", "Limpeza e Zelo", 2521.68, "Niteroi-RJ", "REPROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Felipe Nogueira", "felipe.nogueira@picpay.com",
                "11944369957", "Recrutador", "Recursos Humanos", 8347.39, "Caxias do Sul-RS", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Andre Oliveira", "andre.oliveira@picpay.com",
                "51989513433", "Cientista de Dados", "Transformação Digital", 18390.37, "Uberlandia-MG", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Fernanda Almeida", "fernanda.almeida@picpay.com",
                "21976936763", "Auxiliar de Limpeza", "Limpeza e Zelo", 3171.08, "Manaus-AM", "REPROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Henrique Almeida", "henrique.almeida@picpay.com",
                "85931727889", "Supervisor de Limpeza", "Limpeza e Zelo", 1793.91, "Florianopolis-SC", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Matheus Yamamoto", "matheus.yamamoto@picpay.com",
                "85972774348", "Especialista em Folha de Pagamento", "Recursos Humanos", 10242.56, "Florianopolis-SC", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Bianca Uchoa", "bianca.uchoa@picpay.com",
                "61958122362", "QA Engineer", "Transformação Digital", 12197.77, "Caxias do Sul-RS", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Raquel Gouveia", "raquel.gouveia@picpay.com",
                "11936690967", "Supervisor de Limpeza", "Limpeza e Zelo", 2133.68, "Joinville-SC", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Lucas Lacerda", "lucas.lacerda@picpay.com",
                "85993734670", "Assistente Financeiro", "Financeiro", 12358.62, "Fortaleza-CE", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Eduardo Klein", "eduardo.klein@picpay.com",
                "85906990162", "Recrutador", "Recursos Humanos", 10484.8, "Belo Horizonte-MG", "CONTRATADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Elaine Oliveira", "elaine.oliveira@picpay.com",
                "61956464170", "Desenvolvedor Backend", "Transformação Digital", 9052.74, "Salvador-BA", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Simone Ramalho", "simone.ramalho@picpay.com",
                "11903309232", "Zelador", "Limpeza e Zelo", 1803.6, "Rio de Janeiro-RJ", "REPROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Alexandre Vasconcelos", "alexandre.vasconcelos@picpay.com",
                "61929912419", "Jardineiro", "Limpeza e Zelo", 3105.96, "Brasilia-DF", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Mariana Dornelles", "mariana.dornelles@picpay.com",
                "41919314919", "Analista de Contas a Pagar", "Financeiro", 10386.29, "Recife-PE", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Wesley Barbosa", "wesley.barbosa@picpay.com",
                "61906716572", "Analista de Contas a Pagar", "Financeiro", 7597.83, "Feira de Santana-BA", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Tatiane Farias", "tatiane.farias@picpay.com",
                "81969453147", "SDR", "Comercial", 11931.42, "Joinville-SC", "REPROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Patricia Yamamoto", "patricia.yamamoto@picpay.com",
                "81952735454", "Especialista em Folha de Pagamento", "Recursos Humanos", 8298.15, "Recife-PE", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Samuel Teixeira", "samuel.teixeira@picpay.com",
                "71978377701", "Analista de Contas a Pagar", "Financeiro", 2913.69, "Curitiba-PR", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Leonardo Henriques", "leonardo.henriques@picpay.com",
                "85985685574", "Recrutador", "Recursos Humanos", 5408.96, "Vitoria-ES", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Carolina Ibrahim", "carolina.ibrahim@picpay.com",
                "85923374989", "Desenvolvedor Frontend", "Transformação Digital", 17122.48, "Salvador-BA", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Leonardo Duarte", "leonardo.duarte@picpay.com",
                "85924008427", "QA Engineer", "Transformação Digital", 8480.96, "Uberlandia-MG", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Thiago Bittencourt", "thiago.bittencourt@picpay.com",
                "31904711671", "Jardineiro", "Limpeza e Zelo", 1911.81, "Goiania-GO", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Ricardo Uchoa", "ricardo.uchoa@picpay.com",
                "21931869993", "Auxiliar de Limpeza", "Limpeza e Zelo", 1668.56, "Vitoria-ES", "CONTRATADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Cristina Queiroz", "cristina.queiroz@picpay.com",
                "71949909133", "Assistente de RH", "Recursos Humanos", 11130.79, "Caxias do Sul-RS", "REPROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Gustavo Vasconcelos", "gustavo.vasconcelos@picpay.com",
                "11967974034", "Auxiliar de Limpeza", "Limpeza e Zelo", 1831.76, "Joinville-SC", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Raquel Junqueira", "raquel.junqueira@picpay.com",
                "27936183242", "Analista de RH", "Recursos Humanos", 9030.16, "Porto Alegre-RS", "REPROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Rafael Barbosa", "rafael.barbosa@picpay.com",
                "81917464887", "QA Engineer", "Transformação Digital", 14913.27, "Vitoria-ES", "CONTRATADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Andre Cardoso", "andre.cardoso@picpay.com",
                "11913990490", "Executivo de Vendas", "Comercial", 16252.88, "Salvador-BA", "APROVADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Otavio Yamamoto", "otavio.yamamoto@picpay.com",
                "31996717565", "Cientista de Dados", "Transformação Digital", 13581.87, "Brasilia-DF", "CONTRATADO"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Matheus Vasconcelos", "matheus.vasconcelos@picpay.com",
                "71980715451", "Auxiliar de Limpeza", "Limpeza e Zelo", 1993.65, "Goiania-GO", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Cristina Machado", "cristina.machado@picpay.com",
                "11938597703", "Executivo de Vendas", "Comercial", 12591.03, "Joinville-SC", "APROVADO"));
    }

    public List<Funcionario> listarTodos() {
        return funcionarios;
    }

    public Optional<Funcionario> buscarPorId(Long id) {
        return funcionarios.stream()
                .filter(f -> f.getId().equals(id))
                .findFirst();
    }

    public Funcionario cadastrar(Funcionario funcionario) {
        funcionario.setId(proximoId.getAndIncrement());
        if (funcionario.getStatus() == null) {
            funcionario.setStatus("EM_ANALISE");
        }
        funcionarios.add(funcionario);
        return funcionario;
    }

    public Optional<Funcionario> atualizar(Long id, Funcionario dadosAtualizados) {
        return buscarPorId(id).map(funcionario -> {
            funcionario.setNome(dadosAtualizados.getNome());
            funcionario.setEmail(dadosAtualizados.getEmail());
            funcionario.setTelefone(dadosAtualizados.getTelefone());
            funcionario.setCargo(dadosAtualizados.getCargo());
            funcionario.setDepartamento(dadosAtualizados.getDepartamento());
            funcionario.setSalario(dadosAtualizados.getSalario());
            funcionario.setCidade(dadosAtualizados.getCidade());
            funcionario.setStatus(dadosAtualizados.getStatus());
            return funcionario;
        });
    }

    public Optional<Funcionario> atualizarParcial(Long id, Funcionario dadosParciais) {
        return buscarPorId(id).map(funcionario -> {
            if (dadosParciais.getNome() != null) funcionario.setNome(dadosParciais.getNome());
            if (dadosParciais.getEmail() != null) funcionario.setEmail(dadosParciais.getEmail());
            if (dadosParciais.getTelefone() != null) funcionario.setTelefone(dadosParciais.getTelefone());
            if (dadosParciais.getCargo() != null) funcionario.setCargo(dadosParciais.getCargo());
            if (dadosParciais.getDepartamento() != null) funcionario.setDepartamento(dadosParciais.getDepartamento());
            if (dadosParciais.getSalario() != null) funcionario.setSalario(dadosParciais.getSalario());
            if (dadosParciais.getCidade() != null) funcionario.setCidade(dadosParciais.getCidade());
            if (dadosParciais.getStatus() != null) funcionario.setStatus(dadosParciais.getStatus());
            return funcionario;
        });
    }

    public boolean excluir(Long id) {
        return funcionarios.removeIf(f -> f.getId().equals(id));
    }
}