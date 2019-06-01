function X = Hakidashi(X,N)  % 掃き出し法

    for k = 1 : N
        l = k + 1;
        if k<N && round(X(k,k),5)==0
            
            v = 1; %d行目と%d行目を入れ替える
            itijikansuu_print(X,k,l,0,0,v,N);
            for m=1 : N+1
                        %fprintf("i = %d\nm = %d",i,m);
                    Y(k,m)=X(k,m);
                    X(k,m)=X(l,m);
                    X(l,m)=Y(k,m);
            end
        end
        piv = X(k,k);
        if ne(round(X(k,k),5),0) && ne(round(X(k,k),5),1)
        v = 2; %d行目を%gで割わる
        itijikansuu_print(X,k,l,piv,0,v,N);
        for j=k : N+1
            X(k,j)=X(k,j)/piv;
        end
        end
        
        for i = 1: N
            if ne(i,k) && ne(round(X(i,k),4),0) && ne(round(X(k,k),4),0)
                if round(X(i,k),4)==1
                    v = 3; %d行目から%d行目を引く
                    itijikansuu_print(X,k,l,piv,i,v,N);
                else
                    v = 4; %d行目から%g倍した%d行目を引く
                    itijikansuu_print(X,k,l,piv,i,v,N);
                end
                t=X(i,k);
                for j=k : N+1
                    X(i,j)=X(i,j)-t*X(k,j);
                end
            end
        end
    end
end