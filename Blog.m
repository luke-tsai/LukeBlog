function Blog
    clc
    
    %% imports tidbits
    fileloc='C:\Users\ltsai\Documents\Personal\Github\LukeWebsite\LukeBlog\strata\';
       
    source_files = dir(fullfile([fileloc,'blogposts\'], '*.html'));
    header=fileread([fileloc,'formatting\header.txt']);
    footer=fileread([fileloc,'formatting\footer.txt']);
    body=fileread([fileloc,'formatting\indexbody.txt']);
    output=[fileloc,'index.html'];
    
    fid = fopen(output,'w');
    posthead=strrep(header,'[title]','Blog');
    fprintf(fid, '%s', posthead);
    fclose(fid);
    
    fid = fopen(output,'a');
    for i = 1:length(source_files)
        clear data data2 posttitle posttags postid postlines
        disp([num2str(i),' of ',num2str(length(source_files))])
        data=fileread([fileloc,'blogposts\',source_files(i).name]);
        data2=(strsplit(data,{char(13),char(10)},'CollapseDelimiters',true));
        posttitle=char(data2(1));
        posttitle=posttitle(8:end);
        posttags=char(data2(2));
        posttags=posttags(7:end);
        postid=source_files(i).name(1:(length(source_files(i).name)-5));
        snippet = regexprep(char(data2(4)),'<.*?>','');

        post=strrep(body,'[id]',postid);
        post=strrep(post,'[title]',posttitle);
        post=strrep(post,'[tag]',posttags);
        post=strrep(post,'[body-snippet]',snippet);
        fprintf(fid, '%s', post);
        
        posthead=strrep(header,'[title]',posttitle);
        fidpost = fopen([fileloc,source_files(i).name],'w');
        fprintf(fidpost, '%s', posthead);
        fprintf(fidpost, '%s', ['<h2>',posttitle,'</h2>']);
        for j=4:length(data2)
            fprintf(fidpost, '%s', char(data2(j)));
        end
        fprintf(fidpost, '%s', "<a href='index.html'>< Return to Blog</a>");
        fprintf(fidpost, '%s', footer);
        fclose(fidpost);
    end
    
    fprintf(fid, '%s', footer);
    fclose(fid);

    disp("Done")
end